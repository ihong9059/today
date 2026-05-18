---
title: 위키 로그
type: log
created: 2026-04-19
updated: 2026-05-19 (lemonLabs vault 신설 — 7번째 Tier 3 multi-agent, 이진서×UTTEC 협업 법인)
---

# Second Brain 위키 로그

## [2026-05-19] setup | lemonLabs vault 신설 — Tier 3 분리 + 7번째 multi-agent ⭐⭐

- 참조: [[lemonLabs]], `C:/todo/lemonLabs/CLAUDE.md`, `C:/todo/lemonLabs/00_정의_LemonLabs.md`, [[2026-05-09_이진서협업-창업프로젝트도전]]
- **계기**: 5/19 `today/이진서/지원사업List.txt` 신규 작성 (7개 지원사업 + "레몬랩스" 회사명 사용 시작 + 5/20~5/27 동시 지원 5건). 본격 multi-application + 회사 정체성 단계 진입 → 별도 vault 분리 적기 판단.
- **사용자 결정 7건 합의**:
  1. vault 이름: **lemonLabs**
  2. 위치: `C:/todo/lemonLabs/` (onDevice_AI 옆)
  3. GitHub: ihong9059/lemonLabs private repo 신설
  4. 이진서 본인 합의: 완료
  5. **정체성 4 트랙**: AI 응원봉 / AI 교육 / AI Consulting / AI Studio 병행 운영
  6. 법인 설립 시점: **2027년 초**
  7. 지분: 이진서 51% + UTTEC 49% 확정 (5/9 검토안 재확인)
- **vault 구조**: onDevice_AI 패턴 차용 + 4 트랙 분류축 + **UTTEC협업 영역 경계 명시** (기술지원/의뢰과제/정산)
- **Multi-agent**: `lemonlabs-claude` 신설. **7번째 vault** (6 Claude → 7 Claude). **창업 트랙 vault 첫 사례** (기존: 제품 트랙 5 + 사업 트랙 1).
- **자산 이관**: `today/이진서/` → lemonLabs/ 분산 (트랙별 + 사업/지원사업/ + 콘텐츠/디자인/ + archive/). 원본은 사용자 확인 후 삭제 검토.
- **myWiki 측 박제**: entities/lemonLabs.md 신설 + INDEX 갱신 예정 + PROTOCOL.md 7 Claude 동기화 예정.
- **다음 단계**:
  - Tier 분류 매핑 갱신 (CLAUDE.md "프로젝트 Tier 분류 정책")
  - PROTOCOL.md 7 Claude 동기화 (6 vault 모두)
  - 의뢰과제 첫 lifecycle 검증 (실제 의뢰 발생 시)
  - 2-vault → **4-vault** 분리 운영 (myWiki + onDevice_AI + lemonLabs + 외부 6 협업 Claude vault)

## [2026-05-18] decision | 할일·프롬프트 표시 시각 구분 규칙 신설 (👤/🤖/🔴+👤)

- 참조: `~/.claude/projects/C--todo-today/memory/feedback_todo_display_user_action.md`
- **배경**: 작업보고서 23건 + Notion sync 결과 + 잔여 할일 + 사용자 prompt 등 화면 표시량 누적 → 사용자 직접 행동 항목이 묻혀 누락 위험. 사용자 트리거: "display되는 부분이 많아서 헷갈립니다".
- **규칙**:
  - 🔴 👤 — 시급 + 사용자 직접 행동 (D-day)
  - 👤 — 사용자 직접 행동 (Claude 대신 못 함 — 발주·결제·미팅 참석·서명·승인·결정·외부 회신)
  - 🤖 — Claude 처리 가능 (코드·문서·박제·sync)
  - 노란 인용블록(>)으로 사용자 항목 모아 표시
- **확장**: 할일 테이블뿐 아니라 **응답 본문 전체**까지 적용 (사용자 추가 지시) — 응답 중간 "확인 부탁드립니다"·"결정 부탁드립니다"·"수동 단계" 같은 요청에도 prefix.
- **적용 시작**: 2026-05-18 후반 세션부터 즉시. 모든 work-start/end·일반 응답·작업보고서 표기에 일관 적용.

## [2026-05-18] market | 위시캣 신규 등록 비공개 100% — 2일 연속 패턴

- 참조: `wishketProject/위시캣/2026-05/가능프로젝트/2026-05-18_가능프로젝트.md`, `2026-05-16_가능프로젝트.md`
- **검토 범위**: #155402 ~ #155419 (18 IDs, 5/17~5/18 신규 등록분)
- **결과**: 비공개 13건 + 미존재 5건 → **공개 0건**
- **추세 변화**: 5/16 검토(54건 중 33건 비공개, 61%) → 5/18(13건 중 13건 비공개, **100%**). 표본 작아 일시적일 수 있으나 위시캣 정책 변경(공개 → 회원 한정 전환) 가능성 박제.
- **검증 방법**: 다음 검토(5/19 이후) 패턴 지속 여부 + n8n-claude Ubuntu cron 09:00 자동검색 카드와 교차 확인.
- **사업 영향**: 일일 검토 효율 저하 (평가 가능 표본 감소). 자동검색은 비공개에 막혀 의미 있는 매칭 발굴 불가.

## [2026-05-18] use | Windows 탐색기 default folder = C:\todo 리매핑 (HKCU Win+E 단축키)

- 참조: `backup/rollback-explorer-default-folder-20260518.reg`
- **변경**: HKCU\Software\Classes\CLSID\{52205fd8-5dfb-447d-801a-d0b52f2e83e1}\shell\OpenNewWindow\Command 신규 생성. `(default)` = `explorer.exe "C:\todo"`, `DelegateExecute` = `""` (위임 실행 차단).
- **효과**: Win+E → 즉시 C:\todo 폴더 오픈. 사용자 확인 ✅.
- **롤백**: `.reg` 파일 더블클릭 (CLSID 키 전체 삭제) — reversible 보장.
- **한계**: Win11 작업표시줄 시스템 핀은 .lnk 수정 불가. 바탕화면 `todo 탐색기.lnk` 커스텀 shortcut 생성하여 사용자 수동 핀 단계로 우회.

## [2026-05-17] revenue-pipeline | 위시캣 #155381 (LS XGT PLC + 부스바 가공 PC) 미팅 제안 도착 + 준비 megasession

- 참조: `wishketProject/위시캣/2026-05-17_프로젝트155381_미팅준비/`, `wishketProject/second-brain/entities/부스바.md`, `myWiki/_inbox/pending/2026-05-17-001-wishket-megasession-absorb.md`
- **계기**: 5/16 #155381 PLC 산업자동화 PC 제어 + 좌표 시각화 (1,000만/30일, 매칭 9/9) 사이트 제출 → 5/17 미팅 제안 수신.
- **작업 분담 (병행 megasession)**:
  - **today/mywiki-claude 세션 (11:45~13:00)**: 미팅 준비 9 표준 문서 + README 작성 (76 KB, 5/12 #155057 패턴 차용) + wishketProject `/work-start`·`/work-end` 통합 SKILL.md 설치 (244 + 404줄, n8nUttec 5/16 패턴 4번째 재사용) + RAG 사용자 학습
  - **wishket-claude 세션 (병행)**: 부스바 entity 신설(vault 첫 entity, 15 §) + 미팅 자료 5건 추가(#10 LS XGT 가이드 / #11 언어 선택 / #12 시각화 / #13 Controller vs PLC 교육자료 md+html / #14 동영상 시나리오) + Remotion 5분 동영상(pitch.mp4 19MB) + 18 슬라이드(slides.pdf)
- **vault scope 격리 첫 본격 적용**: 본 작업은 today cwd에서 시작했으나 위시캣 작업은 wishketProject에서 진행 (memory `feedback_vault_scope_isolation.md` 정책 적용). 사용자에게 작업 위치 판단 근거 5가지 보고 후 진행.
- **multi-agent 자산화↔매출화 lifecycle 실증**: wishket-claude가 mywiki entity(v-cut / three-js / modbus / ethercat / STM32 5종)를 영업 무기로 활용한 첫 사례. 5/17 박제 매칭 트리거 4건 검증 (사업 트랙 vault가 제품 트랙 vault 자산을 영업 무기로 활용).
- **흡수 카드 도착**: `myWiki/_inbox/pending/2026-05-17-001-wishket-megasession-absorb.md` (priority: high) — 부스바 entity 신설 권장 + v-cut/three-js/modbus/ethercat cross-link 갱신 + 위시캣활동.md 갱신 + EXAMPLES_wishket.md 신설 (예상 1~2h, 다음 work-start 위임)
- **다음 단계**: 미팅 일정 협의 (도착 시점부터 24h 내 PLC 모델·메모리맵 공유 요청) + 시연 자료(V-Cut 영상·EtherCAT 사진·Modbus RTU) 정리 + #001 카드 흡수.

## [2026-05-17] decision | 프로젝트 Tier 분류 정책 정립 + Tier 2 sub-vault 패턴 신설 (한림용인CC 1번째 적용)

- 참조: [[한림용인cc-고가수조]], `templates/sub-vault-template/README.md`, `templates/sub-vault-template/wiki/CLAUDE.md`
- **배경**: today repo에 단발 SI/위탁 프로젝트가 자주 발생 (INDEX.md 비즈니스 10개 + 제품·기술 4개). 매번 "분리할까/직접 박제할까" 고민이 비용 → 결정 자동화 필요. 사용자 질문 "이런 형태의 project가 자주 발생하거나 진행할 때를 생각한다면 어떤 방향이 좋을까?"가 트리거.
- **3-Tier 표준 정립** (CLAUDE.md "프로젝트 Tier 분류 정책" 섹션):
  - Tier 1 (≤ 1,000만, ≤ 30일) — `project/{name}/` 직접 + myWiki entity 1개, 5분 셋업
  - Tier 2 (1,000만~5,000만, 30~120일, 산출물 多) — `project/{name}/wiki/` sub-vault, 20분 셋업 ⭐ NEW
  - Tier 3 (≥ 5,000만 또는 자체 코드베이스) — 별도 repo + multi-agent 합류, 1h+ 셋업
- **승격 경로**: Tier 1 → 2 → 3 (한 방향, 강등 없음)
- **현재 매핑**:
  - Tier 1: 위시캣 단기 외주 / 단발 컨설팅
  - Tier 2: 한림용인CC ⭐ (1번째) · 위시캣 #155381 PLC · #155365 STGNN · xerix MFC
  - Tier 3: revita / onDevice_AI / wishket / shield / n8n (이미 분리 완료)
- **Tier 2 sub-vault 표준 템플릿 신설**:
  - `templates/sub-vault-template/README.md` — Tier 분류 정책 + 사용법 + 라이프사이클
  - `templates/sub-vault-template/wiki/CLAUDE.md` — 프로젝트별 Claude 가이드 (action 정의: start/decision/purchase/site/firmware/revenue/milestone/complete/absorb)
  - `templates/sub-vault-template/wiki/log.md` — 시간순 박제 single source of truth
  - `templates/sub-vault-template/wiki/{entities,thoughts,archive}/` — 표준 폴더 구조
- **한림용인CC 1번째 적용**:
  - `project/골프_수조_물관리/wiki/` 신설 (robocopy 대신 직접 작성, ~20분)
  - `wiki/CLAUDE.md` — 한림용인CC 고유 컨텍스트 (시공 진행 우선순위 + 완료 후 myWiki 흡수 체크리스트 + 후속 골프장 재사용)
  - `wiki/log.md` — start + decision 박제 (라이프사이클 측정 대상 정의)
  - myWiki [[한림용인cc-고가수조]] entity에 cross-link 추가 (subvault 필드 + 메타 섹션 + Tier 2 운영 정책 섹션)
- **라이프사이클 측정 시나리오** (한림용인CC 사례):
  - 1. 셋업 (5/17, 완료) → 실측 ~20분
  - 2. 시공 진행 박제 (5/17~5/20) → 카드 발송 vs 직접 박제 효율
  - 3. 시공 완료 (5/20 이후) → sub-vault 산출물 양·질
  - 4. myWiki 흡수 (5/21~) → 흡수 비용 + 정보 손실률
  - 5. archive 결정 (1~2주 후) → "분리할 가치 있었나" 평가
- **자산화 계획**: 사례 검증 후 `obsidian/myWikiSetup/EXAMPLES_tier2_subvault.md` 신설 → myWikiSetup 5번째 사례 (Tier 3 4 사례 + Tier 2 1 사례 = 5 트랙)
- **Tier 2의 myWiki와 관계 (정책 핵심)**:
  - sub-vault = 시공·진행 박제 (격리)
  - myWiki entity = 사업 자산 (재거래·매출·영업 전략)
  - 완료 시 sub-vault → myWiki 흡수 + sub-vault는 archive로 보존
- **사용자 의사결정 lifecycle 박제 후보** (시공 완료 후): "이런 형태가 자주 발생할 때 어떤 방향이 좋을까" 질문 → 3-Tier 표준 정립 → 한림용인CC 1번째 적용 → 검증 → 자산화. EXAMPLES_tier2_subvault.md 또는 thoughts/2026-Q2/에 박제 예정.

## [2026-05-16] setup | wishket-claude multi-agent 합류 — 6 Claude 시스템 + 사업 트랙 vault 첫 사례 (시나리오 D 4번째 적용)

- 참조: [[위시캣활동]], [[wishket-platform|wishketProject/second-brain/entities/wishket-platform.md]]
- **사용자 동기**: "wishketProject에서 작업을 하면 myWiki에 작용되도록 되어있나요?" → 옵션 B (multi-agent 합류) 선택
- **인프라 변경 (6 Claude 시스템 확장)**:
  - wishketProject `second-brain/` mini-vault 6 파일 (CLAUDE + log + index + me + entities/wishket-platform + thoughts/2026-Q2/2026-05-16_wishket-claude-합류)
  - wishketProject `_inbox/` 4 항목 (PROTOCOL + SYSTEM_GUIDE + pending/ + processed/)
  - wishketProject `.claude/hooks/check-inbox.py` (SELF_ID="wishket-claude") + `settings.local.json` (SessionStart hook)
- **6 vault PROTOCOL/SYSTEM_GUIDE 동기 sync**:
  - 4 Windows vault (mywiki + revita + ondevice + wishket): md5 PROTOCOL `b963aae8` / SYSTEM_GUIDE `cc5067f4` 일치 ✅
  - n8n (Ubuntu mac): scp 완료, md5 일치 ✅
  - shield (RPi): ssh timeout, 다음 세션 처리 ⏸
- **합류 카드 4건 발송**:
  - mywiki `_inbox/pending/2026-05-16-003-wishket-claude-join.md` (priority: normal, 5단계 흡수 요청)
  - revita `_inbox/pending/2026-05-16-004-wishket-claude-join.md` (정보 공유)
  - ondevice `_inbox/pending/2026-05-16-004-wishket-claude-join.md` (정보 공유)
  - n8n `_inbox/pending/2026-05-16-002-wishket-claude-join.md` (priority: high, 자매 시스템 분담 협업 시작)
- **myWiki 측 영향**:
  - 본 log.md 박제
  - `entities/위시캣활동.md` "저장 위치" 섹션 갱신 (분리 lifecycle 3단계 진화 + SELF_ID + 자매 시스템 + always-send)
  - n8n 위치 정정 (`/home/uttec/uttec/n8nUttec/` → `/home/uttec/project/n8nUttec/`, PROTOCOL.md sync 시 반영)
- **myWikiSetup 패키지 영향 (사업 자산화)**:
  - `EXAMPLES_wishket.md` 신설 (~9KB) — **사용자 5단계 의사결정 lifecycle 박제** (분리 제안 → 실행 → 절대 경로화 지적 → multi-agent 합류 질문 → "B로 진행")
  - README 검증 사례 표 4번째 사례로 갱신 (시나리오 D 4 사례 누적)
  - **사업 트랙 vault 첫 사례** 정립 → 향후 다른 사업 라인 (uttec-edu 등) 확장 패턴
  - **분리 lifecycle 3단계 진화** 패턴 정립 (분리 → 절대 경로화 → multi-agent 합류) → 향후 분리 시 표준
  - **자매 시스템 분담 협업** 패턴 정립 (n8n-claude cron 자동검색 + wishket-claude 정밀 작성 + mywiki-claude 종합)
- **누적 효과**: OS 3종 (Windows·Ubuntu·RPi) + 도메인 4종 (제품·자동화·하드웨어·영업) + 트랙 4종 (제품·학습·자동화·사업) — myWikiSetup 패키지 메타 검증 강화

## [2026-05-16] cleanup | today/위시캣 junction 삭제 (SKILL.md 절대 경로화로 분리 의미 명확화)

- 참조: [[위시캣활동]]
- **배경**: 5/16 위시캣 분리 직후 사용자 지적 — "wishketProject로 분리시켰는데 today에 junction이 있을 필요가 있냐". 합리적 — junction은 디스크 0이지만 분리 의미를 흐림.
- **해결**: SKILL.md 내부 `위시캣/` 상대 경로 → `C:/todo/wishketProject/위시캣/` 절대 경로 일괄 변경. cwd 무관 동작 보장 → today/위시캣 junction 불필요.
- **변경 사항**:
  - `wishketProject/.claude/skills/wishket-check/SKILL.md` + `wishket-apply/SKILL.md` — 위시캣/ → C:/todo/wishketProject/위시캣/ 절대 경로 (21 occurrences 일괄)
  - `today/위시캣` NTFS junction 삭제
  - `today/.gitignore` `위시캣/` 라인 제거
  - `today/myWiki/second-brain/raw/위시캣` symlink → junction으로 교체 (`/c/todo/today/위시캣` → `C:\todo\wishketProject\위시캣`)
- **유지**: `today/.claude/skills/wishket-{check,apply}` junction (cwd=today에서 슬래시 명령 호출 위해 필수)
- **검증 6 checks**: today/위시캣 부재 / today/.claude/skills/wishket-* junction 정상 / SKILL.md 절대 경로 일관성 / myWiki raw 접근 정상 / 두 repo push 동기화 (today `6aae380c` + wishketProject `07502f4`)
- **교훈**: 분리 시 source-of-truth는 분리된 repo만 가리키도록 절대 경로화가 가장 깔끔. junction은 "호환성 임시 다리"이며 절대 경로 정착 후 제거하는 것이 분리 의미를 명확히 함.

## [2026-05-16] cleanup | today/onDevice_AI 잔재 폴더 삭제 (5/15 분리 잔재)

- 참조: [[onDevice-ai]]
- **삭제 대상**: `C:\todo\today\onDevice_AI\` (291KB, `microGPT/karpathy_원본/{input.txt, run_output.log}` 2 파일)
- **상태**: 5/15 onDevice_AI repo 분리 시 빠뜨린 잔재. 별도 `C:\todo\onDevice_AI\` (private repo)에 동일 파일 + 더 많은 파일 (superset) 존재. md5 양측 완전 동일 (`401b3c4c` + `796bb75d`).
- **검증**: git 추적 0 (.gitignore line 122) + myWiki entity 참조 0 (이미 "이전 위치 5/14"로 박제). 데이터 손실 위험 0.
- **추가 정리**: `.gitignore` line 62-63 `onDevice_AI/.claude/` + `onDevice_AI/.obsidian/` 중복 제거 (line 122 `onDevice_AI/`에 포함되므로 불필요).
- **사용자 의도**: today에서 onDevice_AI/ 경로 혼동 제거 + repo 청결성 유지.

## [2026-05-16] migrate | 위시캣 영업 자산 분리 — today/위시캣 + .claude/skills/wishket-* → wishketProject (옵션 B junction 패턴 재활용)

- 참조: [[위시캣활동]], [[2026-05-16_shield-claude-합류]] (어제 옵션 B 패턴 참조)
- **분리 배경**: today repo 슬림화 + 영업 자산(매출 직결, NDA) private 분리 + multi-agent `wishket-claude` 합류 후보. onDevice_AI 분리 패턴과 일치 (영업 자산 → 별도 private repo).
- **신규 private repo**: `ihong9059/wishketProject` (private, 39.7MB / 162 tracked / commit `<initial>`)
- **이동 자산**:
  - `today/위시캣/` (39.7MB / 162 files — 지원서 27건 + 가능프로젝트 35건 + ref/ 이력서/보유기술) → `wishketProject/위시캣/`
  - `today/.claude/skills/wishket-check/SKILL.md` → `wishketProject/.claude/skills/wishket-check/`
  - `today/.claude/skills/wishket-apply/SKILL.md` → `wishketProject/.claude/skills/wishket-apply/`
- **SKILL.md 갱신**: 내부 `지원서류/` (today에 부재 폴더) 참조 → `위시캣/ref/` (실제 파일 위치)로 일괄 정정
- **NTFS Junction 3개 생성**:
  - `today/위시캣` → `wishketProject/위시캣`
  - `today/.claude/skills/wishket-check` → `wishketProject/...`
  - `today/.claude/skills/wishket-apply` → `wishketProject/...`
- **검증**: today에서 `/wishket-check`·`/wishket-apply` skill 등록 유지 (junction 통해 wishketProject SKILL.md 실행). myWiki `raw/위시캣` symlink (`/c/todo/today/위시캣`)도 junction 통해 본 repo 접근 (수정 불요).
- **today/.gitignore 갱신**: `위시캣/`, `.claude/skills/wishket-check/`, `.claude/skills/wishket-apply/` 추가 (junction 추적 방지)
- **다음 단계**: wishket-claude 5 Claude 시스템 합류 (시나리오 D 4번째 적용 후보, 사용자 결정 시)

## [2026-05-16] update | 위시캣 #155365 농장 바이러스 확산 STGNN AI 알고리즘 고도화 지원서 작성 (정직 평가)

- 참조: [[위시캣활동]]
- 프로젝트: 농장 바이러스 확산 방역 내비게이션 AI 알고리즘 고도화
- 예산/기간: 1,300만 / 60일 / 외주(계약) / 서울 도봉구
- 매칭: **7/10 + 2 인접** — Python AI 양산(MobileNetV3/EasyOCR/MNIST) + 농업·축산 IoT 도메인(한림용인CC 고가수조 + #153090 nRF52 스마트팜 양산 진행 중 + 일본 자전거주차장 3,800대) + 운영 중 SaaS 무중단 확장(양산 5종 동시 유지보수) + 시공간 시각화(Three.js 3D + Canvas 2D + Plotly 양산)
- 정직한 약점 명시: STGNN 학술 모델 직접 양산 없음 → 60일 중 첫 2주 PyTorch Geometric/DGL 학습 일정 명시 + 바이러스 역학 도메인 전무 → 클라이언트 전문가 협업 채널 제안
- 8주 4 마일스톤(분석·베이스라인 → 그래프 표현 고도화 → XAI 데이터 적응 → SaaS 무중단 배포) 분할 청구 제안
- 자가 점검 grep 통과(회사명/URL 노출 0건)
- 지원자 13명. 마감 5/29 (D-13). 가능프로젝트 분류 "⚠️ 검토 필요"에서 사용자 명시 요청으로 작성
- **사이트 제출 완료 (5/16)**

## [2026-05-16] update | 위시캣 #155381 PLC 산업자동화 PC 제어 + X/Y 좌표 시각화 + Recipe 지원서 작성

- 참조: [[위시캣활동]]
- 프로젝트: PLC 연동 산업 자동화 PC 제어 및 좌표 시각화 프로그램 개발
- 예산/기간: 1,000만 / 30일 / 외주(계약) / 인천 연수구
- 매칭: **9/9** — RPi3 V-Cut 양산(X/Y 2축 좌표 가공 동일 패턴) + CM4 EtherCAT 양산(이더넷 PLC 산업 표준) + STM32F756 Modbus RTU 양산(KC) + 임호균 MFC Controller 제안 양산 + 대한전선 WINDER(X/Y 모터 제어)
- 차별화: **X/Y 좌표 가공 양산 직접 보유** (V-Cut → 펀칭 좌표 이식) + 2인 팀 분담(홍광선 PLC/Recipe + 임호균 MFC GUI) + 30일 단기 외주 적합
- 검토 범위: #155348~#155401 (54건, 공개 21건 / 비공개 33건, 적합 1건 + 검토 1건 + 추적 1건 = 5.6%)
- 자가 점검 grep 통과 (회사명/URL 노출 0건)
- 위시캣 #155220 PLC/SCADA 지원서 구조 재활용 (90일 → 30일, PLC/SCADA 통합 → PC 응용 단일)
- **사이트 제출 완료 (5/16)**

## [2026-05-16] migrate+setup | shield-claude 합류 — 5 Claude 시스템 + 분산 호스트 3 사례 + myWikiSetup 시나리오 D 세 번째 적용

- 참조: [[shield]], [[2026-05-16_shield-claude-합류]] (mywiki-claude 측 박제 예정), [[n8n-uttec]], [[revita]]
- **사용자 동기 (5/16 prompt)**:
  > shield 폴더(`/home/uttec/project/shield/`)의 진행사항이 myWiki와 연결되어 UTTEC의 비지니스에 참고가 되도록 하면 됨. 옵션 "혼합" (myWikiSetup 풀 셋업 + work-end § 5-F always-send 강제 룰).
- **인프라 변경 (RPi 분산 호스트, 새로운 OS·hardware 사례)**:
  - 신규 vault `/home/uttec/project/shield/` (RPi Linux, ssh shield, Tailscale 100.120.255.34)
  - 12 파일 신설 (second-brain/ 7 + _inbox/ 4 + .claude/hooks/check-inbox.py)
  - work-end SKILL § 5-F **always-send 강제 룰** 커스텀 — myWiki와 항상 자동 연결 보장
  - SELF_ID="shield-claude" 등록, 5 Claude 시스템으로 확장
  - myWikiSetup `templates/` 변수 치환 명시적 적용 (시나리오 D 세 번째 적용 사례)
- **myWiki 측 영향**:
  - `_inbox/PROTOCOL.md` § 활성 Claude 4→5 갱신 + 합의 이력 § 2026-05-16 shield-claude 합류 항목 추가
  - `_inbox/SYSTEM_GUIDE.md` 5 Claude 구성도 + 핵심 자산 표 갱신 + shield-claude 박스 신설
  - `entities/shield.md` 신설 (~7KB) — UTTEC 사업 자산화 관점 (revita / 한림용인CC / aiHardStudy 매칭)
  - 본 log.md 항목 박제
  - n8n-claude 위치 정정: `/home/uttec/uttec/n8nUttec/` → `/home/uttec/project/n8nUttec/` (5/16 megasession에서 잘못 박제됨)
- **revita / ondevice / n8n 측 영향**:
  - 각 vault `_inbox/PROTOCOL.md` + `_inbox/SYSTEM_GUIDE.md` 5 vault 동기 사본 갱신 (md5 일치 검증 9c822fa5 / 78f3ed3d)
  - 각 vault `_inbox/pending/2026-05-16-NNN-shield-claude-join.md` 합류 통보 카드 발송 (mywiki #002 / revita #003 / ondevice #003 / n8n #001)
- **myWikiSetup 패키지 영향 (사업 자산화)**:
  - `EXAMPLES_shield.md` 신설 예정 (시나리오 D 세 번째 사례 박제)
  - README.md 검증 사례 표 갱신 — 시나리오 D 3 사례 누적 (Windows × 1 + Linux × 2)
  - 패키지 메타 검증 강화: 분산 호스트 다양성 (Mac→Ubuntu + RPi) + 도메인 다양성 (자동화 + 하드웨어 시험)
- **shield 자산 보존**:
  - 자기-완결 평면 파일 (`CLAUDE.md`, `_진행로그.md`, `_다음할일.md`, `사용법.md`) 그대로 유지
  - 5/10 셋업된 `.claude/skills/work-{start,end}/SKILL.md` (일반화 버전) → multi-agent 통합 버전으로 업그레이드
- **핵심 차별점 — 강제 absorb 룰**:
  - 기존 myWikiSetup § 5-F: 판단 기반 ("알림 가치 있나?")
  - shield 특화 § 5-F: **always send absorb card** (빈 세션 heartbeat 포함)
  - 사용자 query "이 folder의 myWiki와 연결되나요?" → **확실하게 ✅** 답 가능

## [2026-05-16] migrate+setup | n8n-claude 합류 — 4 Claude 시스템 + 분산 호스트 + myWikiSetup 시나리오 D 두 번째 적용

- 참조: [[n8n-uttec]], [[2026-05-16_n8n-claude-합류]], [[2026-05-15_제품별-vault-통합-패턴]], [[n8n]], [[ai-direction]]
- **사용자 동기 (5/16 prompt 원본)**:
  > "예제를 하나 만들어 file:///c:/todo/today/obsidian/myWikiSetup folder에 추가했으면 좋겠읍니다. 현재 ssh ubuntu에 접속하면 mac hardware에 ubuntu가 설치된 pc가 있고, 그곳에 n8n이 setup되어있읍니다. 그리고 /uttec/n8nUttec folder가 있어요, 그곳에 새로운 work flow들을 만들면서 n8n을 공부하고, 더 나은 자동화 work flow를 생성하여 전체적으로 uttec의 영업및 사업화에 기여할려고 합니다. 그곳에 wiki를 만들어 진행사항을 다른 agent들과 같이 myWiki와 협업할려고 합니다."
- **인프라 변경 (Ubuntu 분산 호스트)**:
  - 신규 vault `/home/uttec/uttec/n8nUttec/` (Ubuntu 22.04, ssh ubuntu, Tailscale 100.90.158.36)
  - 22 파일 / 1,588 insertions / 초기 commit 6f17aa3 (main 브랜치)
  - SELF_ID="n8n-claude" 등록, 4 Claude 시스템으로 확장
  - myWikiSetup `templates/` 변수 치환 명시적 적용 (시나리오 D 두 번째 적용 사례)
- **myWiki 측 영향**:
  - `_inbox/PROTOCOL.md` 합의 이력 § 2026-05-16 추가 + 활성 Claude 4 항목
  - `_inbox/SYSTEM_GUIDE.md` 4 Claude 구성도 + 핵심 자산 표 + 합의 이력 갱신
  - `entities/n8n-uttec.md` 신설 (~9KB)
  - `thoughts/2026-Q2/2026-05-16_n8n-claude-합류.md` 신설 (시나리오 D 두 사례 비교 + 메타 검증)
  - `index.md` entities + thoughts 표에 등재
  - 본 log.md 항목 박제
- **revita / onDevice_AI 측 영향**:
  - `revitaProject/_inbox/PROTOCOL.md` 합의 이력 § 2026-05-16 + 활성 Claude 4 항목
  - `onDevice_AI/_inbox/PROTOCOL.md` 합의 이력 § 2026-05-16
- **myWikiSetup 패키지 영향 (사업 자산화)**:
  - `obsidian/myWikiSetup/EXAMPLES_n8nUttec.md` 신설 (사용자 prompt 원본 박제 포함, ~12KB) — **두 번째 검증 사례 박제**
  - `obsidian/myWikiSetup/README.md` § "검증된 실 사례" 표 갱신 (시나리오 D 첫·두 번째 등재)
- **합류 통보 카드 3건 발송**:
  - `myWiki/_inbox/pending/2026-05-16-001-n8n-claude-join.md` (n8n → mywiki, request)
  - `revitaProject/_inbox/pending/2026-05-16-001-n8n-claude-join.md` (n8n → revita, request)
  - `onDevice_AI/_inbox/pending/2026-05-16-001-n8n-claude-join.md` (n8n → ondevice, request)
- **사이클 의미**:
  - **myWikiSetup 패키지 메타 검증** — 시나리오 D 2 사례 누적 = 검증된 모델 (호오컨설팅·인프런·강사양성 컨설팅 deliverable 후보)
  - **분산 호스트 검증** — Windows 3 + Linux 1 환경에서 _inbox 메일박스 패턴 + tar-stream 전송 + Python hook 모두 정상 작동
  - **자동화 사업 라인 신설 가능성** — UTTEC AI 3대 사업 라인 + 자동화 사업 라인(4순위) 후보
- **다음 단계**:
  - 가동 중 n8n 워크플로우 2건(Test_Ubuntu_n8n_동작확인 + chain 2) export → `n8nUttec/workflows/` 박제
  - 첫 학습 노트 `n8nUttec/학습/00_n8n-기초.md` 작성
  - GitHub `ihong9059/n8nUttec` private repo 생성 + push (사용자 직접)
  - 합류 카드 3건 lifecycle 종료 (수신측 다음 세션 처리)

---

## [2026-05-16] absorb | _inbox 카드 5/15-001 ondevice-claude 합류 통보 — 5단계 흡수 완료

- 카드: `_inbox/pending/2026-05-15-001-ondevice-claude-join.md` (from: ondevice-claude, type: request, priority: normal)
- **5단계 흡수 체크리스트 결과**:
  1. **신규 entity** — `entities/onDevice-ai.md` + `entities/uttecBizWiki.md` 5/15 megasession 시 갱신 완료 확인. 별도 신규 entity 없음
  2. **신규 gotcha** → `gaps.md § 자동화/스크립팅 함정 패턴 (2026-05-15 신설 — onDevice_AI ingest #1 흡수)` 신규 섹션 3건 추가:
     - bash heredoc 변수 expansion 손실 (n8n expression 사고)
     - n8n npm silent downgrade → Docker 표준
     - Gmail App Password 채팅 노출
  3. **신규 decision** → `ai-direction.md § 판단 로그` 2건 추가:
     - 2026-05-15 "제품별 vault 통합 패턴 채택 (3-vault → 2-vault)"
     - 2026-05-15 "n8n 표준 = Docker (npm install 비표준화)"
  4. **매칭 패턴** → `thoughts/2026-Q2/2026-05-15_제품별-vault-통합-패턴.md` 신설 (revita 패턴 검증 + onDevice 적용 = 2 사례 = 패턴 검증, A+B→C+D 패턴 도출)
  5. **revita entity** — 직접 영향 없음. revita 패턴이 onDevice에 적용되었다는 메타 정보는 [[onDevice-ai]] entity와 thoughts에 박제됨
- **인프라 갱신 후속 점검**:
  - `_inbox/PROTOCOL.md` 합의 이력 § 2026-05-15 ondevice-claude 합류 — ✅ 갱신 확인 (5/15 megasession 시 처리됨)
  - `_inbox/SYSTEM_GUIDE.md` 핵심 자산 표 + 3 Claude 구성도 — ✅ 갱신 확인
  - `index.md` line 79~80 — uttecBizWiki entry → DEPRECATED 표시 + onDevice-ai 설명 갱신 (이번 사이클에서 처리)
  - `raw/onDevice_AI` junction → `/c/todo/onDevice_AI` 재연결 — ✅ 5/15 08:29 갱신 확인
  - `raw/uttecBizWiki` junction → 제거 완료 (raw/ 디렉토리 목록 부재 확인)
  - `second-brain/CLAUDE.md § 디렉토리 구조` — ✅ 5/15 갱신 확인 (`raw/onDevice_AI/` 항목 "2026-05-15 위치 변경 + 정체성 확장" 명시됨)
- **카드 lifecycle 종료**:
  - 카드 → `_inbox/processed/2026-05-15-001-ondevice-claude-join.md` 이동 + frontmatter `status: done`
  - 발신측 회신: `/todo/onDevice_AI/_inbox/pending/2026-05-16-001-ack-ondevice-join.md` (type: done)
- **사이클 의미**: 3 Claude 시스템의 **첫 흡수 사이클 lifecycle 정상 종료** (mywiki ↔ revita 5/12 첫 사이클에 이은 두 번째 사이클). 5/15 megasession의 큰 인프라 변경(repo 분리 + 흡수 + 합류) 후속 점검 완료. 향후 ondevice→mywiki 카드 패턴(Phase 2 검증 결과 / 영업 이벤트 / Stage 4 첫 수주 / 매칭 패턴)이 본 사이클 통로로 전파 시작 가능.

## [2026-05-15] migrate+absorb | onDevice_AI repo 분리 + uttecBizWiki 흡수 + multi-agent 합류 (3-vault → 2-vault)

- **인프라 변경 3건 동시** (onDevice_AI vault 측):
  1. **repo 분리**: `today/onDevice_AI/` → `/todo/onDevice_AI/` (별도 git repo, private, ihong9059/onDevice_AI)
  2. **uttecBizWiki 흡수**: 구 `today/uttecBizWiki/` 전체 → `onDevice_AI/business/` 폴더 (제품별 분리, 한 제품 = 한 vault)
  3. **multi-agent 합류**: 신규 Claude 식별자 `ondevice-claude` 등록, `_inbox/{pending,processed}/` + `.claude/hooks/check-inbox.py` 셋업
- **myWiki 측 영향**:
  - `entities/onDevice-ai.md` — 위치·정체성·폴더 구조·multi-agent·uttecBizWiki 관계 갱신 (검증 vault → 제품 통합 vault)
  - `entities/uttecBizWiki.md` — DEPRECATED 표시, redirect anchor (onDevice_AI/business/ 흡수처 명시)
  - `_inbox/PROTOCOL.md` 합의 이력 — 2026-05-15 ondevice-claude 합류 등재 (예정)
  - `_inbox/SYSTEM_GUIDE.md` 핵심 자산 표 — onDevice_AI 행 추가 (예정)
  - `raw/onDevice_AI` junction — `today/onDevice_AI` (제거됨) → `/todo/onDevice_AI` 재연결 필요 (사용자 직접)
  - `raw/uttecBizWiki` junction — 제거 또는 `/todo/onDevice_AI/business`로 재연결 (사용자 직접)
- **memory 측 영향**:
  - `project_3vault_분리.md` → 2-vault 구조로 갱신 예정
  - `feedback_vault_scope_isolation.md` — onDevice_AI 별도 repo 명시 추가 예정
- **사용자 동기 (5/15)**: "제품별로 분리하는 것이 좋겠다" — 한 제품의 기술과 비즈니스가 따로 노는 것보다 한 vault에서 통합 추적이 일관성 + cross-link 단순화에 유리. revita 패턴(별도 repo + multi-agent) 검증된 모델 적용.
- **보존**: onDevice_AI vault의 검증 목표·계획·정지선·인재상 100% 유지 — 인프라만 변경, 콘텐츠 0 변경
- **상대 Claude 통보 카드 발송 예정**:
  - `myWiki/_inbox/pending/2026-05-15-001-ondevice-claude-join.md` (to: mywiki-claude)
  - `revitaProject/_inbox/pending/2026-05-15-001-ondevice-claude-join.md` (to: revita-claude)

---

## [2026-05-15] foundation | onDevice_AI vault 기초 구조 v1.0 완료 — 7 hardware × 10 응용 scope 확장

- 참조: [[onDevice-ai]], [[ai-fanstick]], [[uttec-stage-package]], [[ai-direction]]
- 신설 12 파일, 갱신 3 파일, 누적 ~2,000줄. vault scope: microGPT + AI FanStick(2건) → **7 hardware × 10 응용 카탈로그**로 확장.
- 핵심 4 문서:
  1. **`00_정의_OnDeviceAI.md`** (헌법, 150줄) — On-Device AI canonical 정의 + 4 가치(P/L/O/C) + 4 기술(양자화·프루닝·증류·NPU) + 스펙트럼 T1~T4 + **연구 5축 15 질문** + 흔들릴 조건 4 (정지선 해제 트리거)
  2. **`0_실험계획서.md`** (Master Plan, 580줄) — H1~H7 가설 + 응용 카탈로그 10건 + **실험 12 단위(E1~E12)** + Phase 1~4(Phase 5 양산 ⛔) + KPI 정량/정성 + 위험 완화 7 + **담당자 첫 주 onboarding Day 1~7**
  3. **`0_인재상.md`** (채용·평가, 420줄) — 페르소나 A 펌웨어 강점 / B ML 강점 / C 풀스택 (우선순위 A≥B>C), 3-Tier 기술 요건, 평가 체크리스트 80점(합격선 ≥65), Red flags 8개(AI 도구 거부 포함), 자가진단 15항
  4. **`hardware/`** 폴더 (9 파일, 700줄) — `_README` + `_matrix` + 7 보드 `00_spec.md` (pca10040·pca10056·esp32wroom·esp32c6·esp32s3·smartphone·pc)
- 실측 디바이스 확인: SSH/USB로 Ubuntu(MBP11,4 i7-4770HQ 16GB) + Windows(Lenovo i5-1235U 16GB) + Galaxy A51 5G(Exynos 980 NPU 2.1 TOPS 6GB) 확정. **smartphone은 플래그십 아닌 2020 미드레인지** 발견 — 응용 가능성 재조정 (TinyLlama 1.1B borderline, 3B+ 불가).
- 정정: pca10040 = Cortex-M0 16KB ❌ → Cortex-M4F 64KB ✅ (이전 추측 오류)
- 폴더 운영 결정: **hardware-first hybrid** (1차 축 = 보드, 2차 축 = 응용, cross = `_matrix.md` 단일 출처). 보드 RAM 차수 6(64KB~16GB)이 정당화.
- 영업 의미: vault가 "분석 단계 → 실행 단계 진입 가능 상태". 보드(7종 보유 ✅) + 환경(Ubuntu 빌드 ✅) + 계획(12 실험 ✅) + 인재상(평가 가능 ✅) 모두 ✅. Phase 4 종료 시 영업/Stage4 자료에 실측 데이터 첨부 → 첫 Stage 4 수주 시도 가능.
- 다음 단계: (a) Claude 단독 Phase 0 — E9 환경 셋업 + microGPT 학습 재현 / (b) 담당자 합류 후 Phase 1 — esp32s3 microGPT 4K full pipeline / (c) UTTEC 강사양성 출신 적합 후보 점검
- 의미: 기존 0_검증계획.md(microGPT + AI FanStick 한정) → 본 master plan의 sub-plan으로 격하. vault가 단일 영업 트랙(Stage 4 AI FanStick)에서 **광역 On-Device AI 연구 vault**로 격상.

## [2026-05-15] update | 위시캣 #155325 지원서 작성 — IoT 플랫폼 무중단 확장, 양산 5개 운영 자산 정조준

- 참조: [[위시캣활동]], [[양산제품]], [[영업전략]], [[skills]]
- 프로젝트: 기존 IoT 서비스 플랫폼 APP/Web 기능 확장 개발 (Flutter + Node.js + Python 필수, 3,000만/90일, 마감 5/21 D-6, **외주**, 지원자 29명 매우 치열)
- 핵심 차별점: **신규 개발이 아닌 "운영 중 시스템 무중단 확장"** = 양산 제품 5개 동시 유지보수 운영 자산이 직접 매핑되는 IoT 도메인 특수 영역
  1. Flutter (필수) → 양산 4개 앱 (사전빌드 + Python Vibe + AI FanStick + 교육, BLE + 카메라 + AI API 통합)
  2. Node.js (필수) → 양산 (영업관리 SaaS + 학습 + 데모 25개, JWT + 권한·감사 로그)
  3. Python (필수) → 양산 (Flask + FastAPI + AI 통합 + 빌드 서버)
  4. 기존 IoT 시스템 운영 → STM32F756 컴프레서 KC + STM32F407 세탁기 + RPi CM4 EtherCAT + nRF52832 BLE 온도 KC + 일본 주차장 BLE Mesh 3,800대 (KC+TELEC+CE) 동시 유지보수
  5. 실시간 데이터 → RAK4630 LTE + MQTT 24/7 + LoRa 클라우드 국내 최초 상용화(2018) + 라이브 모니터링 5요소
  6. Web 관제 → Next.js / React / TypeScript 양산
  7. 권한·감사 로그 → 영업관리 SaaS JWT + 권한 분리 양산
- 보너스 2건:
  - **AI 확장** → LLM API 4종(Claude/GPT/Gemini/Groq) + AI 모델 양산(MobileNetV3/EasyOCR/MNIST) + Memory MCP 지식 그래프
  - **HW + FW 인접** → IoT 디바이스 측 변경 필요 시 외부 협력사 의존 0 (BLE Mesh 양산 + KC 인증 양산)
- 매칭률: **7/7 + 2 보너스 (AI + HW)**
- 차별화 영업 무기 (29명 경쟁): **양산 5개 동시 유지보수 운영 자산**으로 "운영 중 마이그레이션 / 회귀 위험 / 사용자 단절 위험"을 양산 환경에서 다뤄온 검증 자산. 일반 SW 외주가 가질 수 없는 IoT 도메인 운영 자산
- 자가 점검: **첫 시도부터 grep 위반 0건** — `feedback_wishket_no_company_name.md` 메모리 보강 후 3번째 적용 사례에서 **사전 차단 정착 입증**
- 영업 의미: 오늘 5번째 지원서 작성 (#155235 + #155220 + #155225 + #155248 + #155325) — **신규 사업 라인 외주 영업 누적 1.2억원 파이프라인**
- 산출: `위시캣/2026-05-15_프로젝트155325_지원내용.txt`. 위키 갱신: 위시캣활동(27건+) + log(본 항목)

---

## [2026-05-15] update | 위시캣 #155248 지원서 작성 — 교통신호제어함 BLE 스마트락 풀스택, 일본 3,800대 BLE Mesh 양산 정조준

- 참조: [[위시캣활동]], [[양산제품]], [[영업전략]], [[회사소개]]
- 프로젝트: 교통신호제어함체 스마트 Lock 관리시스템(웹/앱/서버) 구축 및 GS 인증 대응 (3,000만/90일, 마감 5/25, **외주**)
- 핵심 매칭: BLE + 풀스택 + 인증 양산이 모두 직접 적용
  1. BLE 현장 제어 → **nRF52832 BLE 양산 + BLE Mesh 일본 주차장 3,800대 수출 (한국 KC + 일본 TELEC + 유럽 CE 3개국 인증)**
  2. 다중 함체 원격 제어 → 일본 자전거주차장 무인 원격 양산 (500→3,300대 리비전 패턴) + RAK4630 LTE + MQTT 24/7
  3. Web 관제 → Next.js / React / TypeScript 양산 (교육 플랫폼 + 홈페이지 + 데모 25개)
  4. Mobile App → Flutter 4개 양산 (사전빌드 + Python Vibe + AI FanStick)
  5. 서버 → Flask / FastAPI 양산 + PostgreSQL / SQLite 양산
  6. 장애·이력 관리 → Historian 5요소 자체 운영
  7. HTTPS/SSL 보안 → 다중 도메인 양산 + VPN 원격 관리 양산
  8. GS 인증 → KC + TELEC + CE 인증 양산 경험 → 절차 학습 후 즉시 대응
  9. 스마트락 도메인 → 위시캣 #154806 BLE 아파트 출입통제 지원 이력 + 일본 자전거주차장 자동 잠금·해제 양산
- 매칭률: **8/9 + 1 인접 (GS 인증 절차)**. 지원자 26명 (매우 치열) — 차별화: **HW + FW + App + Web + Server + 인증 한 팀 수직 통합 = 외부 협력사 의존도 최소화, 의사소통 비용·일정 지연·책임 분담 분쟁 모두 최소화**
- 자가 점검: 작성 직후 grep 패턴(`UTTEC|uttec|유티즘|유티텍|duckdns|tailscale|uttec\.co\.kr|031-627|github\.com/ihong`) 실행 → 8건 발견 → 일괄 마스킹 → 재점검 0건 통과. **`feedback_wishket_no_company_name.md` 메모리 보강 이후 첫 적용 사례**.
- 영업 의미: AI 스마트팩토리 외주 3건(#155235 + #155220 + #155225)에 이어 **BLE / IoT / 풀스택 영역까지 영업 파이프라인 확장**. 한일 특허 + KC/TELEC/CE 3개국 인증 양산 자산을 위시캣 외주 영역에 본격 활용 시작
- 산출: `위시캣/2026-05-15_프로젝트155248_지원내용.txt`. 위키 갱신: 위시캣활동(26건+) + log(본 항목)

---

## [2026-05-15] update | 위시캣 #155225 지원서 작성 — PLC/DAQ X-ray 자동화, 양산 자산 5개 직접 매핑

- 참조: [[위시캣활동]], [[양산제품]], [[영업전략]], [[ai-direction]]
- 프로젝트: PLC/DAQ 연동 10채널 통합 제어 및 데이터 파싱/리포팅 SW 개발 (X-ray 선량 측정 자동화, 1,500만/90일, 마감 5/25, **외주**)
- 핵심 매칭: 본 프로젝트 4대 요구가 모두 양산 라이브 자산의 도메인 적응 수준
  1. PLC/DAQ 10채널 동시 제어 → STM32F756 Modbus RTU 양산(KC) + RPi CM4 EtherCAT 양산(10채널 동시 제어 아키텍처 직접 양산)
  2. 데이터 파싱 + RSD 통계 → Python numpy 표준 통계 + AI 모델 성능 분포 분석 일상 (numpy.std 수준)
  3. 시험 성적서 자동 생성·배포 → 한글 PDF Chrome Headless + n8n SMTP 자동 발송 (위시캣 매일 09:00 cron 자체 운영 = **양식만 시험 성적서 표준으로 변경하면 즉시 적용**)
  4. 1-Click 무인 자동화 + 모바일/PC 결과 확인 → uttec-sensor.duckdns.org 24/7 라이브 모니터링 (반응형 + Push 알림 양산)
- 매칭률: **7/7 + 1 인접** (방사선 도메인 — 위시캣 #154381 HPIC 방사선 DAQ 보드 지원 이력)
- 차별화 영업 무기: 지원자 16명(경쟁 치열) — **PC SW + PLC + Python 통계 + PDF 자동화 + 라이브 모니터링을 모두 양산 라이브로 운영 중인 팀은 거의 없음**. 신규 설계 위험 최소화 → 90일 안에 완성도 높은 시스템 구현
- 영업 패턴: AI 스마트팩토리 사업 라인의 **세 번째 외주 진입 시도** (#155235 MES AI 예지보전 + #155220 PET PLC/SCADA + #155225 X-ray PLC/DAQ). 동일 양산 자산이 도메인을 바꿔가며 반복 적용되는 자산 레버리지 패턴 확인
- 산출: `위시캣/2026-05-15_프로젝트155225_지원내용.txt`. 위키 갱신: 위시캣활동(지원 25건+) + experience(5월 항목) + log(본 항목)

---

## [2026-05-15] revenue-pipeline | 위시캣 #155325 사이트 제출 완료 — 오늘 5건 제출 신기록 (1.2억원 파이프라인)

- 참조: [[위시캣활동]], [[영업전략]], [[ai-direction]]
- 행동: #155325 IoT 플랫폼 무중단 확장 지원서를 위시캣 사이트 폼에 제출 완료. **오늘 위시캣 5건 사이트 제출 완성**(#155235 + #155220 + #155225 + #155248 + #155325).
- 영업 의미 — **단일 일자 위시캣 5건 사이트 제출 신기록**:
  - 누적 파이프라인 가치: 1.2억원
  - 영역 분포: AI 스마트팩토리 외주 3건(#155235 + #155220 + #155225) + BLE/IoT/풀스택 2건(#155248 + #155325)
  - 자산 레버리지 패턴 검증: 동일 양산 자산이 도메인(MES / PET / X-ray / 스마트락 / IoT 운영)을 바꿔가며 반복 적용 → 5개 외주 동시 영업 가능
  - **한 건 수주 시 신규 사업 라인 외주 본격 시작**, 다 건 수주 시 신규 사업 라인 안착 가속
- 메모리 사이클 입증 (3차 적용 완료): #155225 사고(URL 2회 노출) → 메모리 보강 → #155248 사후 차단 8건 → #155325 사전 차단(첫 시도 0건). **사고 → 박제 → 사전 차단 → 정착 사이클 완성**.

---

## [2026-05-15] revenue-pipeline | 위시캣 #155248 사이트 제출 완료 + 클라이언트 답변 3건 동시 작성

- 참조: [[위시캣활동]], [[ai-direction]], [[영업전략]]
- 행동: #155248 BLE 스마트락 풀스택 지원서를 위시캣 사이트 폼에 제출 + 클라이언트 사전 질문 답변 3건 동시 작성
  - `유사경험답변.txt` (양산 실적 3건: 일본 자전거주차장 무인 원격 + LED Dimmer BLE Mesh 3,800대 + BLE 아파트 출입통제)
  - `사업분야경험답변.txt` (10년 무선 IoT 인프라 + 정부·공공·대기업 납품 + 해외 수출)
  - `성공제안답변.txt` (4단계 Phase 검수 + 시범→양산 확대 패턴 + 풀스택 수직 통합)
  - 모두 500자 이내, 자가 점검 grep 통과 (회사명·URL 노출 0건)
- 영업 의미: **오늘 하루 위시캣 4건 사이트 제출 완성** (#155235 MES + #155220 PET + #155225 X-ray + #155248 BLE 스마트락). AI 스마트팩토리 외주 3건 + BLE/IoT/풀스택 1건 동시 영업 파이프라인 진입. 한 건이라도 수주 시 신규 사업 라인 외주 본격 시작.
- 패턴 검증: `feedback_wishket_no_company_name.md` 메모리 보강(자가 점검 grep 패턴) → #155248 작성 시 8건 위반 사전 차단 → 후속 클라이언트 답변 3건은 작성 단계부터 위반 0건. **메모리 학습 → 사전 차단 → 위반 감소 사이클 입증**.

---

## [2026-05-15] revenue-pipeline | 위시캣 #155225 사이트 제출 완료 + URL 마스킹 위반 1건 박제

- 참조: [[위시캣활동]], [[ai-direction]]
- 행동: #155225 PLC/DAQ X-ray 자동화 지원서를 위시캣 사이트 폼에 제출 완료
- **사고/회복**: 작성 단계에서 자사 라이브 모니터링 URL `uttec-sensor.duckdns.org`를 2회 노출 (라인 79·123). 회사명 마스킹 메모리(`feedback_wishket_no_company_name.md`)에 URL 마스킹 규칙이 이미 있었음에도 위반. 사용자가 직접 "수행 예제 있음"으로 수정. 메모리에 도메인 prefix 식별 위험 + 작성 직후 자가 점검 grep 패턴 보강.
- 영업 의미: AI 스마트팩토리 사업 라인 외주 **3건 동시 영업 파이프라인** 완성 (#155235 MES + #155220 PET + #155225 X-ray). 동일 양산 자산(PLC + Python 통계 + PDF 자동 + 라이브 모니터링)이 도메인을 바꿔가며 반복 적용되는 자산 레버리지 패턴 검증.

---

## [2026-05-15] revenue-pipeline | 위시캣 #155235·#155220 사이트 제출 완료

- 참조: [[위시캣활동]], [[영업전략]], [[ai-direction]]
- 행동: 어제 작성한 두 지원서를 위시캣 사이트 폼에 직접 입력·제출 (사용자 직접 수행)
  - **#155220** (PET 두께 측정 PLC/SCADA, 2,000만/90일 자재 별도) — D-day 당일 5/15 마감 안에 제출 성공
  - **#155235** (MES + AI 예지보전, 2,500만/60일, 시작 2026-07-01) — 5/25 마감, 여유 있게 제출
- 의미: 2026-04 AI 3대 사업 라인 전환 이후 **AI 스마트팩토리 정조준 외주 2건이 영업 파이프라인에 동시 진입**. 한 건이라도 수주 시 신규 사업 라인 외주 진입이 완성됨.
- 다음: 클라이언트 회신 메시지 대기 (#155235 사전 요구 3건 답변 별도 파일 준비됨) + Notion DB 수동 등록 2건 (통합 권한 미연결로 자동화 실패) + PLC 플랫폼 선호도 확인 (#155220 Cimon/iX/WinCC 중 클라이언트 선택 시 라이선스 견적·사전 학습 가능)

---

## [2026-05-14] update | 위시캣 #155220 지원서 작성 — PLC/SCADA + 서보 모션 양산 정조준

- 참조: [[위시캣활동]], [[양산제품]], [[영업전략]]
- 프로젝트: 서보 기반 비접촉식 PET 용기 두께 측정기 전장 배선 및 PLC/SCADA 개발 (2,000만 / 90일 자재 별도, **D-1 마감 5/15**)
- 핵심 매칭: STM32F756 Modbus RTU 양산(KC) + EtherCAT 양산 + 대한전선 WINDER 모터 제어(협업자 임호균) + SCADA 5요소(Tag/HMI/Recipe/Historian/Alarm) 자체 운영
- 매칭률: 10/11 + SCADA 상용 패키지 1주 적응 (Cimon/iX/WinCC 인접)
- 위치: 부천 오정구 (용인 기흥 → 1.5시간), 외주(계약), 원격 + 현장 마일스톤 출장 제안
- 의미: 1호기 PC(C#) 한계 → 2호기 PLC/SCADA 재개발 사이클이 일본 자전거주차장 1차(500대)→2차(3,300대) 리비전 양산 패턴과 직접 매핑. PLC 직접 양산 + 모터 제어 + Modbus 산업 통신을 한 번에 어필하는 정조준 지원.
- 산출: `위시캣/2026-05-14_프로젝트155220_지원내용.txt` + 위시캣활동.md / experience.md 갱신

---

## [2026-05-14] update | 위시캣 #155235 지원서 작성 — AI 스마트팩토리 첫 외주 진입

- 참조: [[위시캣활동]], [[영업전략]], [[양산제품]]
- 프로젝트: 기 운영중인 MES 내 AI 제조 예지보전 기능 개발 (2,500만 / 60일, 시작 2026-07-01)
- 핵심 매칭: 이종 PLC 통합 (LS/Cimon/중국 Modbus, 임호균 공장자동화 38년) + Python AI 서버 (MobileNetV3/EasyOCR/MNIST 양산) + 데이터 파이프라인 (RAK4630 LTE+MQTT 24/7) + 스마트팩토리 모니터링 라이브 자산
- 매칭률: 9/10 + Spring Boot 인터페이스 협업 (1 부분 매칭)
- 협업: 외주(계약 단위), 원격 + 핵심 마일스톤 현장 방문 제안 (당사 용인 기흥, 수도권 공장 즉시 방문 가능)
- 의미: 2026-04 AI 3대 사업 라인(2순위 AI 스마트팩토리) 전환 후 **첫 외주 진입 기회**. 한국기계 협력 + 85억 파쇄기 제안서 자산을 외주 수주로 전환하는 첫 단계.
- 산출: `위시캣/2026-05-14_프로젝트155235_지원내용.txt` + 위시캣활동.md / experience.md 갱신

---

## [2026-05-14] ingest | 김정호 KAIST "AI 메모리 시대" 강연 흡수

- 참조: [[2026-05-14_AI-메모리시대-김정호KAIST]], [[ai-landscape]]
- 원본: `raw/유투브/엔비디아_시대_끝_결국_웃는건_삼성_하이닉스_김정호_KAIST_상세.md` (19분 45초, 이데일리TV 2026 넥스트테크 포럼)
- 핵심 흡수:
  - **메모리 시대 명제**: 토큰 = 메모리 = 전기 = 돈 (12:48), "AI 시대 돈은 메모리가 번다" (19:06)
  - **GPU 한계 도달**: 발열·통신 한계로 NVIDIA 4개, AMD 16개 (HBM 비교)
  - **HBM5/HBM7 로드맵**: GPU를 HBM 옥상으로, HBF(낸드 적층) 부착
  - **2038년 시그널**: HBF 인퍼런스 전용 메모리 폭증 예측
- 복리 패턴:
  - 클라우드 메모리 폭증 ↔ UTTEC onDevice AI 대각선 포지션
  - "토큰 비용 없는 AI" = 자영업·산업·노약자 영역 차별화 카피로 활용
- 산출물:
  - 신규 thought: `thoughts/2026-Q2/2026-05-14_AI-메모리시대-김정호KAIST.md`
  - `ai-landscape.md` "AI 반도체 — 메모리 시대 전환" 섹션 추가

---

## [2026-05-14] migration | Mac PC → Ubuntu 22.04 LTS 컨버전, 개발 전용 노드 신설

- 참조: [[uttec-ubuntu-pc]], [[2026-05-14_mac에서-ubuntu로]]
- 산출물:
  - **하드웨어 재활용**: Intel MacBook Pro의 macOS 완전 삭제 → Ubuntu 22.04.5 LTS 설치 (8코어 / 16GB / 457GB)
  - **SSH 접속 단축**: Windows `~/.ssh/config`에 `Host ubuntu` 별칭 + Tailscale IP `100.90.158.36` 등록 → **`ssh ubuntu` 한 단어 접속**
  - **개발 환경**: Node.js 20.20.2 (NodeSource) + Claude Code v2.1.141 (`/usr/bin/claude`)
  - **신규 엔티티**: `entities/uttec-ubuntu-pc.md`
  - **회고 박제**: `thoughts/2026-Q2/2026-05-14_mac에서-ubuntu로.md`
- 의미·전환:
  - **2대 PC 동시 사용 시대 종료** — 그동안 Windows ↔ Mac 대칭 동기화 → 이제 **Windows = myWiki/일상 / Ubuntu = 개발 전용**으로 역할 분리
  - 어제(5/13) 작업보고서 #21 "Mac PC 재 clone (history rewrite로 git pull 불가)" → 본 컨버전으로 **완전 해소**
  - Linux 임베디드(onDevice_AI / revita / AISG 펌웨어) 개발 환경의 표준화 — 기존 [[reference_uttec_192_168_0_23|uttec@192.168.0.23 Debian ARM64]] 셋업과 같은 패턴 확장
- 메모리 갱신:
  - `project_dual_pc.md` — Ubuntu는 동기화 대상에서 제외, Windows 단일 myWiki source 명시
  - `reference_uttec_ubuntu_mac.md` (신규) — SSH 별칭 `ubuntu` 셋업 박제

## [2026-05-13] asset | UTTEC × AISG 3.0 Pitch 동영상 제작 — 미팅 사후·후속 영업 시청각 자산

- 참조: [[aisg]] § "AISG 표준 자료 패키지", `remotion-project/out/UttecAisgPitch/`
- 산출물:
  - `video.mp4` — 8분 56초 / 35.5 MB / 1920×1080 H.264 / 7 scene (1 인사·약속 / 2 AISG 이해 / 3 PHY 0% / 4 5대 강점 / 5 PHY 깊이 MAX11947 / 6 13주 타임라인 / 7 클로징·3대 약속)
  - `video_1.2x.mp4` — 7분 27초 / 20.7 MB / 1.2배속 (ffmpeg setpts + atempo)
- 기술 스택: **Remotion** (1920×1080 30fps, 16082 frame) + **Edge TTS** (ko-KR-SunHiNeural -5%) + ffmpeg 후처리
- 제작 과정 박제:
  - 1차 시도 (concurrency=4) 22분 후 stall — Background sin/cos blob + blur(60px) GPU 부담 누적
  - 단순화(정적 gradient + 정적 radial-glow) + concurrency=2로 재시도 성공
  - 사용자 요청으로 Scene 7 (결제+정직 시그널) 제거 → 8→7 scene
  - 사용자 요청으로 1.2배속 후처리 (ffmpeg 2분, 전체 재렌더 대비 10배 빠름)
- 시사점:
  - **5분 이상 Remotion 영상**: 정적 background 권장 / concurrency=2 / --log=info+tee 진행률 모니터링 필수
  - 동영상은 미팅 1회용이 아닌 **사후 follow-up·임원 1차 자료·후속 AISG 영업 자산**으로 재사용
  - TTS(7분 27초 1.2배속) = 사람이 직접 말로 8~10분 분량과 동등 → 클라이언트 의사결정권자가 미팅에 못 와도 사후 전달 가능

## [2026-05-13] asset | OOK 2.176 MHz PHY + Bias-T + MAX11947 심층 자료 — 미팅 PHY 질문 직격 대응

- 참조: [[aisg]] § "AISG 표준 자료 패키지", `위시캣/2026-05-12_프로젝트155057_미팅준비/준비물/5_OOK_2.176MHz_BiasT_상세.md`
- 분량: 9 KB / 8 섹션 / Q&A 6개 / 출처 18개
- 핵심 발견:
  - **driver IC 확정**: ADI / Maxim **MAX11947** (AISG v2/v3 통합 compliant, 4채널 MUX, 3×3 mm TQFN, +15 dB spectral mask margin, EVKit 즉시 구매 가능)
  - **상용 Smart Bias-T 5 vendor** 식별: Kaelus / HUBER+SUHNER / Amphenol / CCI BT-0821 (800-2200 MHz, IL 0.2 dB, 2 A, 서지 2 kA) / RFS
  - **PHY 핵심 사양 11항목** 수치화: carrier 2.176 MHz / 9.6 kbps / +3 dBm 0.89 Vpp / RX BPF 200 kHz / xtal 8.704 MHz ±100 ppm / DC 10-30V 2A 등
  - **Bias-T L/C 토폴로지** + Smart Bias-T 시스템도 ASCII art
- 미팅 활용:
  - 클라이언트 "PHY 어떻게 구현?" 질문 시 § 5 Q&A 6개로 즉시 답변
  - **"PHY는 v2.0→v3.0 변경 0%"** 사실로 "AISG 양산 경험 없음" 약점을 데이터로 무력화
- 영업 자산화: 1회용 X. AISG 시장 진입 후 후속 외주·강의·교재 자산으로 재사용 가능

## [2026-05-12] asset | AISG 표준 사전 학습 자료 패키지 신설 — 미팅 1회용 → 후속 영업·교육 재사용 자산

- 참조: [[aisg]] § "AISG 표준 자료 패키지", `위시캣/2026-05-12_프로젝트155057_미팅준비/AISG자료/`
- 산출물: 5 파일 / 55 KB / Q&A 21개
  - `00_AISG_목적과_배경.md` (13 KB) — **WHY** (통일 대상 5가지·이해관계자별 가치·발전사)
  - `01_AISG_3.0_상세_spec.md` (11 KB) — **WHAT** (3계층·HDLC·EP·v3.0 신기능 4종)
  - `02_AISG_2.0_vs_3.0_심도비교.md` (10 KB) — **DIFF** (PHY 0%/L2 5%/L3 90% 변경 매트릭스)
  - `03_ALD_타입별_상세.md` (13 KB) — **DEVICE** (RET·TMA·GLS·ASD 동작·명령·펌웨어 모델)
  - `README.md` (7 KB) — 인덱스·학습 순서 5 step
- 웹 리서치 출처 8개 (aisg.org.uk 공식 / Wikipedia / Analog Devices / EDN / Connector Supplier / 3GPP TS 25.460~466 / HandWiki / AISG Subunit 표준)
- 핵심 메시지 5건 (정직 시그널 / PHY 변경 0% / OOK 자산 차별화 / 13/13 매칭 / Multi-Primary 동시성 완화)
- 시사점:
  - **WHY/WHAT/DIFF/DEVICE 4단 분류**가 5분~60분 어떤 분량 요구에도 즉시 적응 가능한 구조 만듦
  - 비전공자 (PM·구매) → 00_*.md만으로 충분 / 기술자 → 01~03 + Q&A 21개로 깊이
  - **미팅 1회용이 아닌 자산**: AISG 시장 진입 후 후속 외주·영업·강의 재사용 가능 → 24M 1회 수주가 아닌 시장 진입의 디딤돌

## [2026-05-12] market | 위시캣 #155057 AISG 클라이언트 미팅 제안 수령 ★ 영업 자산화 결정적 단계

- 참조: [[위시캣활동]] § "미팅 진행 단계 프로젝트", [[aisg]] § "위시캣 #155057 지원 이력"
- 단계 진입: 지원서 제출(5/7) → **미팅 제안 수령(5/12)** = 위시캣 첫 본격 통신 프로토콜 양산 수주 단계 진입
- 클라이언트 사전 요구 4가지 수령: 회사 소개(ppt/pdf) / 유사 포트폴리오 시연 / 개발 방식 / 협업 방식·현장 일정
- **핵심 요구 #3**: "AISG 양산 소스 보유자가 3.0 버전업하는 방식" 우대 명시. 우리는 소스·직접 경험 없음 → 정직 + 2경로(A 인수 / B 자체 5강점) 전략 수립
- 준비물 패키지 신설: `위시캣/2026-05-12_프로젝트155057_미팅준비/준비물/` (6 파일 + 시각자료 14 파일 / 5.03 MB)
- 매칭률 진화: 9/10 (5/7 지원) → 11/11 (OOK 직접 보강) → **13/13** (HW+SW 2인 팀 + 현장 동일 지역 + C++ 레거시 분석 추가)
- 시사점:
  - **정직 시그널 전략**의 첫 실전 적용 — 부풀리지 않고 약점 사전 명시가 1단계 신뢰
  - **현장 동일 지역(용인 기흥구)** 자산이 영업 차별화 핵심 — 다른 지역 외주가 따라올 수 없는 구조적 강점
  - **OOK 직접 구현 자산(REVITA 2026-05)** 이 양산 수주로 직결되는 첫 사례 — 4월에 만든 자산이 5월에 매칭
  - 외부 위키 흡수 정책(2026-05-12 신설)이 본 미팅 준비 자료(`myWiki/aisg.md`, `revita.md`, `회사소개.md`) 즉시 참조로 효과 검증
- 다음 단계:
  - 미팅 1일 전: md→PDF 변환 4건 + 사진·동영상·지도 수집 (사용자 작업 2~3시간)
  - 미팅 진행: 본 준비물 패키지 활용
  - 미팅 후: 결과 박제 (수주/탈락/보류 모두) — 본 절차의 첫 실증

## [2026-05-12] skill | work-start / work-end 측 multi-agent 시스템 통합 (시스템 영구화)

- 참조: `today/.claude/skills/work-start/SKILL.md` § 1-C, `today/.claude/skills/work-end/SKILL.md` § 5-E·5-F·5-G, `myWiki/_inbox/SYSTEM_GUIDE.md`
- 트리거: 사용자 — "이런 진행이 상실되지 않도록 /work-start나 기타 방법으로 진행 가능하게, /work-end에서 다른 claude가 작업 이어갈 수 있도록 정리"
- 처리:
  - **work-start § 1-C 신설** — myWiki/_inbox/pending/ 명시적 확인 단계. 카드 있으면 5단계 흡수 우선 처리 안내
  - **work-end § 5-E 신설** — revitaWiki 마지막 ingest vs myWiki 마지막 absorb 비교 (비대칭 방지). 미흡수 발견 시 즉시 처리 또는 자동 카드 위임
  - **work-end § 5-F 신설** — multi-agent 인계 카드 작성. 이번 세션에서 다른 Claude가 알아야 할 변경 시 그쪽 inbox에 카드
  - **work-end § 5-G 신설** — 시스템 자산 존재 검증 (PROTOCOL.md / SYSTEM_GUIDE.md / hook). 누락 시 경고
  - **`_inbox/SYSTEM_GUIDE.md` 신설** — 새 Claude 세션을 위한 빠른 진입 가이드 (시스템 구성도 + 핵심 자산 위치 + 첫 사이클 사례 + 확장 절차)
  - revita 측에 정합화 권고 카드 발송 (`#005`, priority: low) — 저쪽 work-end skill도 동등 단계 추가 권고
- 효과 (장기):
  - **시스템 인지 유실 방지** — work-start가 매번 inbox 확인, work-end가 매번 정합화 점검
  - **새 Claude 세션 빠른 진입** — SYSTEM_GUIDE.md만 읽으면 한 번에 파악
  - **자동 작동 보장** — SessionStart hook + 스킬 명시 단계 + 자산 존재 검증 3중 방어선
- 검증 시점:
  - 다음 work-start 실행 시 — § 1-C가 정상 실행되는지
  - 다음 ingest #9 발생 시 — 흡수 사이클이 사용자 broker 없이 자동 닫히는지
  - 1개월 후 — `today/.claude/skills/` 추가 변경 시 본 통합이 보존됐는지

---

## [2026-05-12] absorb | revitaWiki ingest #8 흡수 완료 — 외부 위키 흡수 정책 첫 실증 ★

- 참조: [[2026-05-12_원격모니터링-사업라인]] (신규 thought), [[revita]], [[한림용인cc-고가수조]], [[gaps]], [[strengths]], [[skills]], [[ai-direction]]
- 처리 카드: `myWiki/_inbox/pending/2026-05-12-001-ingest-8-absorb.md` (PROTOCOL 합의 후 첫 표준 카드)
- 흡수 5단계 결과:
  1. **entity 갱신·신규 (skills.md / strengths.md)** — "원격 모니터링 풀스택 (Flask+pyserial+Chart.js+systemd)" 4 라인 skills.md 신규 + strengths.md "현장 배포 운용 자산" 섹션 신설
  2. **gotcha (gaps.md)** — "현장 배포 함정 패턴" 섹션 신설 + 3건 박제 (CP2104 S/N / RPi USB Undervoltage / Chart.js CDN 의존). 강의·교재 자산 가치
  3. **decision (ai-direction.md)** — 판단 로그 2026-05-12 2건 추가: ① 위키 ingest 누락 방지 3계층 자동화 패턴 채택 ② 원격 모니터링 풀스택 = 사업 라인 발견
  4. **매칭 패턴 (thoughts/2026-Q2/)** — `2026-05-12_원격모니터링-사업라인.md` 신설. Solar Monitor + 한림용인CC 골프수조 = 동일 풀스택 + 7종 응용 영역 매트릭스
  5. **entities/revita.md 갱신** — § "2026-05-12 ingest #8 흡수" 신설 (Solar Monitor + 함정 3종 + button_module + 3계층 자동화)
- 후속 행동:
  - 카드 → `_inbox/processed/2026-05-12-001-ingest-8-absorb.md` 이동 (status: done)
  - revita-claude inbox에 done 회신 카드 발송 (`2026-05-12-004-absorb-done.md`)
- 메타 의미:
  - **외부 위키 흡수 정책 첫 실증** — 정책 만든 같은 날 첫 발동 + 6건 자산 박제
  - **multi-agent 통신 시스템 정상 작동** — 카드 lifecycle 박제 (request → done)
  - 다음 ingest #9부터는 SessionStart hook이 자동 알림 → 사용자 broker 없이 흡수 가능
- 검증 시점:
  - 한림용인CC 시공 시 Solar 자산 재사용 비율 (목표 ≥ 50%)
  - 2026-06-12 — 7종 응용 영역 중 영업 시도 1건 이상
  - 분기 후 — 새 매출 수주 또는 영업 진행 사례 1건

---

## [2026-05-12] protocol | multi-agent _inbox 통신 시스템 합의·가동 (with revita-claude)

- 참조: [[2026-05-12_revitaWiki-myWiki-비대칭]], `C:\todo\today\myWiki\_inbox\PROTOCOL.md`
- 트리거: 사용자 — "내가 broker 안 하고 두 Claude가 직접 협업하는 통로 만들자"
- 합의 흐름 (3단계):
  - **단계 1** myWiki Claude 제안 (옵션 A 단순 메일박스 + 표준 카드 frontmatter + 외부 `_claude-bus/` 위치)
  - **단계 2** revita Claude ACK + 위치 1건 조정 (외부 → **각 프로젝트 내부 `_inbox/`**) — 권한 단순화 / self-contained / sync 명확성 / 일관성
  - **단계 3** myWiki Claude 동의 + 셋업 완료 (본 항목)
- 위치 조정 동의 이유: 4가지 모두 타당. 특히 좀 전 사용자 broker로 전달된 임시 카드 `myWiki/_inbox/ingest-8-absorb.md` 가 이미 내부 위치라 일관성 결정적.
- myWiki 측 셋업 완료:
  - `_inbox/{pending,processed}/` 생성 + `PROTOCOL.md` 사본 (revita 본문 그대로 + 합의 이력 §3단계 추가)
  - `.claude/hooks/check-inbox.py` 작성 (revita 코드 그대로 + `SELF_ID = "mywiki-claude"`)
  - `.claude/settings.local.json` SessionStart hook 등록
  - 임시 카드 → `pending/2026-05-12-001-ingest-8-absorb.md` 표준 frontmatter 마이그레이션
  - ACK 카드 `2026-05-12-002` → `processed/` 이동
- 시스템 가동 첫 메시지: `2026-05-12-003-mywiki-ack-protocol.md` (revita inbox에 발송)
- 효과:
  - **사용자 broker 부담 0** — 두 Claude가 비동기로 자동 협업
  - ingest #N → absorption #N 추적 가능 (카드 id로 lifecycle 박제)
  - 향후 uttecBizWiki / onDevice_AI 등 추가 시 같은 패턴 (자기 _inbox 만들면 됨)
  - escalation 채널 — 한쪽 처리 불가 시 사용자에게 escalate
- 다음 사이클 발동:
  - `2026-05-12-001` 카드 (ingest #8 흡수 요청) 처리는 별도 작업 — 사용자 결정 후 또는 다음 myWiki 세션 시 SessionStart hook이 자동 인지

---

## [2026-05-12] absorption | 한림용인CC 골프 프로젝트 myWiki 흡수 + INDEX 정책 보강 (좀 전 진단의 두 번째 검증)

- 참조: [[한림용인cc-고가수조]] (신규), [[회사소개]], [[영업전략]], [[skills]], [[2026-05-12_revitaWiki-myWiki-비대칭]]
- 트리거: 사용자 — "golf장 project도 감지되나요?" → INDEX·myWiki entity 둘 다 미감지 발견
- 발견의 의미:
  - 시공 직전 1,000만원 매출 프로젝트가 myWiki entity 0개 / INDEX 미노출 상태로 2일(5/10~5/12) 방치
  - revitaWiki만의 흡수 누락이 아니라 **today/ 전반의 시스템적 패턴** 확인
  - 좀 전 [[2026-05-12_revitaWiki-myWiki-비대칭]] 진단의 두 번째 데이터 포인트
- 영업 인사이트 (재거래 패턴 박제):
  - 2020 한림광릉CC (조명) → 2026 한림용인CC (수조) = **기존 고객 그룹 신규 사업장에서 새 영역 수주**
  - 한림그룹 산하 골프장 다수 → 본 사례 성공 후 같은 솔루션 복제 가능
  - 1인 기업 + 6년 전 관계 자산 = 중국 저가 공세가 닿지 않는 영역
- 처리:
  1. **entity 신설** [[한림용인cc-고가수조]] — 발주자·견적·일정·UTTEC 자산 매칭·위험 완화·사업 자산화 매핑 (10KB README 흡수)
  2. **회사소개.md** — 2026년 거래 + 골프 고객 리스트 한림용인CC 추가
  3. **영업전략.md** — "기존 고객 신규 사업장·영역" 패턴 섹션 신설 + 확장 후보 명시
  4. **skills.md** — LoRa/Zigbee 보강 (간헐→활성) + LoRa E22 EByte 920MHz 풀스택 + 수위센서 펌프제어 신규 3 라인 추가
  5. **INDEX.md** — project/골프_수조_물관리 비즈니스 카테고리에 명시 + "컨테이너 폴더 sub-folder 등재 정책" 신설
  6. **myWiki/CLAUDE.md** — "today/ 신규 폴더 → entity 검토 정책" 신설 (3단계: 가치 평가 → entity 신설 여부 → cross-link)
  7. **index.md** — 신규 entity 등재
- 효과:
  - 매출 1,000만원 프로젝트가 6개 페이지에 즉시 연결됨 (entity·회사·영업·skills·INDEX·index)
  - 향후 today/ 신규 폴더 발생 시 자동 흡수 트리거 작동
  - 영업 측 "재거래 패턴"이 첫 명시화 → 비슷한 사례 (필로스GC·광릉CC 등) 추적 가능

---

## [2026-05-12] cleanup | myWiki 구조 정리 + today/INDEX.md + thoughts 분기화 + entities lint 정책

- 참조: [[2026-05-12_revitaWiki-myWiki-비대칭]] (이 정리의 동기)
- 트리거: 사용자 — "이런 방식으로 자주 진행할텐데 한 folder에 모두 모으면 관리 어려움" → 4단계 일괄 진행 요청
- 처리:
  1. **빈 sub-folder 4개 제거** (progress/, optimization/, improvement/, direction/) — schema에는 있지만 0파일이라 mental model 노이즈만 만듦. CLAUDE.md 디렉토리 구조 갱신.
  2. **thoughts/ 분기 sub-folder화** — 10개 thought을 `thoughts/2026-Q2/`로 이동. README 추가로 정책 명시. Obsidian wikilink는 파일명 resolve라 기존 링크 영향 없음.
  3. **entities/ 정기 lint 정책** — 분기별 또는 60개 도달 시 6개월+ updated 안 됨 & 참조 0 → `entities-stale/`로 이동. CLAUDE.md에 정식 등재.
  4. **today/INDEX.md 신설** — 36개 폴더를 7개 카테고리로 분류한 표 페이지. 실제 폴더 위치 변경 없음 (junction·git 안전). 신규 폴더 등재 정책 명시.
- 효과 (예상):
  - 매 작업 시 "이거 어디 넣지?" 결정 부담 감소 (특히 thoughts·entities)
  - today/ 36폴더가 카테고리로 그룹화돼 검색 시간 단축
  - 향후 1년간 자료 누적해도 mental model 일정 유지
- 검증 시점:
  - 다음 thought 작성 시 — 2026-Q2/ sub-folder에 자동 진입했는가
  - 2026-08-12 (3개월 후) — entities lint 첫 실행
  - 다음 today/ 신규 폴더 생성 시 — INDEX.md 자동 등재됐는가

---

## [2026-05-12] policy | 외부 위키 흡수(Absorption) 정책 신설 — revitaWiki 비대칭 진단의 처방

- 참조: [[2026-05-12_revitaWiki-myWiki-비대칭]] (진단 thought 신규)
- 진단: revitaWiki entities 32개 + gotcha 21개가 축적됐지만, myWiki/skills.md에 Zephyr/libopencm3/RAK4631/INA219 등 핵심 키워드 0회 등재 — 자료의 약 90%가 사업 자산화되지 않음. 양 바퀴 비대칭.
- 처방: myWiki/CLAUDE.md 워크플로우 섹션에 "외부 위키 흡수 (Absorption)" 단계 신설. 5단계 체크리스트 (entity / gotcha / decision / 매칭패턴 / revita 사업요약).
- 트리거: revitaWiki/log.md에 `## [날짜] ingest #N |` 신규 항목 발생.
- 첫 적용 시점: 다음 revitaWiki ingest #8 종료 시.
- 검증: 1개월 후(6/12) myWiki/skills.md 키워드 등장 빈도 재측정, 새 매칭 패턴 thought 1건 이상 생산 여부.

---

## [2026-05-12] ingest | revita/remocon 핀포인트 동기 + entity 보강 (STM32 + Blue Pill 통합)

- 참조: [[revita]], [[aisg]], [[2026-05-07_OOK-두-응용-영역]]
- 트리거: 사용자가 좀 전 Blue Pill blink 작업 → revita remocon project 인지 확인 → 로컬 동기 결정.
- **발견 — 양방향 분업 워크플로우 정리**:
  - 로컬 `C:\todo\revitaProject\` = 위키 작업장 (revitaWiki ingest #4~#7, 10+ unpushed commits)
  - Pi `~/revita/` = 펌웨어 개발장 (origin/main 동기, 5/9~5/12 Solar Monitor 작업)
  - 두 클론은 의도된 분기 상태. ingest 사이클로 주기 통합.
- 처리:
  - `git checkout origin/main -- remocon/` 핀포인트 동기 (29 MB / 1507 파일, HEAD 불변)
  - 충돌 파일 2건은 `_thisPC` 접미사로 보존 (`작업보고서/2026-05-12_thisPC_ingest.md`, `.context/2026-05-12.session_thisPC.md`)
  - myWiki `entities/revita.md` CC1101 섹션 대폭 보강 — 펌웨어 변형 5종 표, AISG 시너지, **2026-05-12 박제** (COM25=REMOCON01 식별 / Blue Pill 보드 호환 / ST-Link 드라이버 해결)
  - revitaWiki entity 직접 갱신은 스킵 — 사용자가 ingest #8 진행 중이라 충돌 회피
- 인사이트: 본 PC에서 좀 전 만든 `today/revita/blue_pill_blink/` (244B bare-metal)과 `revita/remocon/stm32/` (libopencm3 + USB CDC + Modbus)가 **같은 STM32F103C8T6 보드** → 향후 디버그 출력 통합 가능. `stm32/src/usb_cdc.c` 재사용 경로 확보.
- 비계산 자산: ST-Link 드라이버 영구 설치. 본 PC에서 향후 STM32 플래시 즉시 가능.

---

## [2026-05-10] performance | Obsidian vault 인덱싱 최적화 — 무거운 junction 6개 제거

- 참조: [[skills]], [[ai-education-web]], [[aiHardStudy]], [[remotion-project]], [[homepage]], [[revita]], [[aiStudy]]
- 동기: Obsidian vault 로드 시 hang (CPU 154%, 인덱싱 130K 파일). userIgnoreFilters는 인덱싱만 막고 filesystem walk는 막지 못해 raw/ 안 130K 파일 traversal이 영구 부담.
- 처리:
  - **junction 6개 제거** (target 폴더 보존):
    - aiHardStudy (51,213 파일, 99.8% 코드)
    - ai-education-web (31,449 파일, 97.6% 코드)
    - aiStudy (14,715 파일, 98.9% 빌드 산출물)
    - remotion-project (12,746 파일, 97.4% 빌드)
    - homepage (9,802 파일, 98.6% Next.js)
    - revita (7,832 파일, 99.5% 빌드)
  - **myWiki/CLAUDE.md raw/ 트리 정리**: 위 6개 + 이전 dangling 외벽로봇/충전기 항목 제거, onDevice_AI_검증 → onDevice_AI 정정
  - **app.json userIgnoreFilters 강화** (40 → 101 패턴): node_modules, .next, build, dist, .gradle, .dart_tool, intermediates 등 폴더 단위 ignore 추가
  - **obsidian-git 자동화 비활성**: autoPullOnBoot=false, autoPullInterval=0, autoPushInterval=0, autoSaveInterval=0, pushOnAutoCommit=false (vault root가 today repo 안이라 git status 비용 큼)
- 효과: vault 파일 130,472 → **5,445** (96% 감소), Obsidian 로드 10~20분 → 수 초
- 영향 없음:
  - 6 폴더의 target 보존 (today/aiHardStudy/ 등 그대로) — Claude는 직접 경로 접근
  - entity 파일 (`entities/aiHardStudy.md` 등) 영향 없음 — wikilink는 entity .md 파일을 가리킴
  - 노트 작성·그래프·검색·dataview 동일 동작 (.md 노트 2.6K 그대로 인덱싱)
- 원칙: vault에는 **노트 가치 있는 자료**만 junction. 코드 산출물·빌드 결과는 vault 밖 직접 경로.

## [2026-05-10] rename | onDevice_AI_검증 → onDevice_AI (vault 폴더명 + entity rename)

- 참조: [[onDevice-ai]], [[uttecBizWiki]], [[ai-fanstick]]
- 동기: 사용자 `goOndevice.bat`이 `C:\todo\today\onDevice_AI` 가정. + 5/10 시장조사/ 통합으로 vault 정체성이 "검증" → "온디바이스 AI 작업 공간"으로 확장된 흐름 일치.
- 처리 (옵션 B — 활성 시스템만):
  - **폴더 rename**: `git mv onDevice_AI_검증 → onDevice_AI` (이력 보존, 23개 tracked file rename)
  - **Junction 재생성**: `myWiki/second-brain/raw/onDevice_AI_검증` 제거 → `raw/onDevice_AI` 신규 생성
  - **Entity rename**: `entities/onDevice-ai-검증.md` → `entities/onDevice-ai.md`
  - **활성 config 9 파일** PowerShell UTF-8 일괄 치환:
    - `.claude/skills/{vault-start,vault-end,biz-start,biz-end,wishket-check}/SKILL.md`
    - `.claude/memory/{MEMORY,feedback_vault_scope_isolation,project_3vault_분리}.md`
    - `.gitignore` (2 라인)
  - **Vault 내부 6 파일**: `README.md`, `CLAUDE.md`, `log.md`, `microGPT/01_검증절차.md`, `aiFanStick_차세대/학습설계/00_README.md`, `통합검증/02_Stage4_영업매핑.md`
  - **myWiki cross-link 5 파일**: `index.md`, `entities/{uttecBizWiki,ai-fanstick,onDevice-ai}.md`, `thoughts/2026-05-08_응원봉-온디바이스AI-정지선.md`
  - **uttecBizWiki sister vault 5 파일**: `README.md`, `CLAUDE.md`, `log.md`, `index.md`, `entities/AI_FanStick.md`
  - **Active reference docs 4 파일**: `aiStudy/introductionAi/14_On-Device_AI.md`, `작업보고서/temp/microGPT_초보자_가이드.md`, `영업/Stage4_OnDeviceAI_검토.md`, `응원봉/마케팅검토/README.md`
- 보존(이력 정확성): 작업보고서 5/7~5/8, vault 내부 5/7 작업보고서, 이진서·응원봉 마케팅검토(5/8) historical, 위시캣 5/8 가능프로젝트, 본 log.md 과거 entry, thoughts 2026-05-08_onDevice-AI-확장영역.md
- `goOndevice.bat` 동작 확인: ✅ `C:\todo\today\onDevice_AI` 경로 일치

## [2026-05-10] archive | gsd ext repo 이동 — 학습 완료 자산 정리

- 참조: [[claude-code]], [[projects]]
- 대상: `today/gsd/` (GSD 워크플로우 학습용 Task Tracker CLI, 22 파일 / 347KB)
- 운용 중단 신호: 모든 페이즈 COMPLETED (v1.0 MVP 완료, 2026-03-24 마지막 활동)
- 처리: `ihong9059/ext/gsd/` 으로 이동 (commit 695e4ea). twinCat·nlm 패턴 일관 적용.
- 함께 보존된 자산 (5/10 추가):
  - `실습_설명서.md` (23KB) — 9 섹션 종합 한국어 가이드 (Number Memo CLI 새 실습 템플릿 포함)
  - 4 페이즈 × PLAN+VERIFICATION 산출물 표준 사례
- myWiki 정리:
  - `raw/gsd` junction 제거
  - `CLAUDE.md` raw/ 디렉토리 구조에서 gsd 행 제거
  - `index.md` entity 테이블에서 [[gsd]] 행 제거
  - `entities/gsd.md` → archive 표시 + 새 실습 권장 폴더(`gsd_practice/numberMemo/`) 명시
- 영향 없음: `/gsd:*` 슬래시 명령은 `~/.claude/commands/gsd/` + `~/.claude/get-shit-done/`에 별도 설치되어 폴더와 무관, 정상 동작 유지

## [2026-05-10] archive | nlm ext repo 이동 — 운용 중단 시스템 정리

- 참조: [[skill-자동화]], [[projects]]
- 대상: `today/nlm/` (NotebookLM YouTube → PPTX 자동화, v1~v3, 120 파일 / 16MB)
- 운용 중단 신호: 마지막 활동 2026-02-18, 약 3개월 미사용
- 처리: `ihong9059/ext` repo `nlm/` 으로 이동 (commit 7f69457). 5/9 26개 archive 통합 패턴 일관 적용.
- myWiki 정리:
  - `raw/nlm` junction 제거
  - `CLAUDE.md` raw/ 디렉토리 구조에서 nlm 행 제거
  - `index.md` entity 테이블에서 [[nlm]] 행 제거
  - `entities/nlm.md` → archive 표시(status: archived, archived_to 명시)로 갱신
- 영향 없음: `/nlm` 슬래시 스킬은 NotebookLM 웹 여는 별도 도구라 정상 동작 유지
- 부활 절차: `entities/nlm.md`의 "부활 시" 섹션 명시

## [2026-05-10] structure | aiOnDevice/ → onDevice_AI_검증/시장조사/ 통합

- 참조: [[onDevice-ai-검증]], [[ai-direction]]
- 5/5 시장 조사(aiOnDevice/, 4 파일) → 5/7 검증 vault의 트리거였으므로 한 우산 아래로 통합
- git mv로 이력 보존 + 활성 참조 6건 갱신 (3 frontmatter + wishket-check skill + 14_On-Device_AI lesson + microGPT 가이드)
- 보존(이력 정확성): 작업보고서 5/5, 본 log 5/5~5/6 entry, 유투브 요약은 그대로

## [2026-05-10] archive | twinCat ext repo 이동 — TwinCAT 서비스 관리 스크립트

- 참조: [[skills]], [[projects]]
- `today/twinCat/` (2 파일, 5KB) → `ihong9059/ext/twinCat/` (commit 93bd75b)
- 5/9 ext archive 패턴 일관 적용

## [2026-05-10] research | LoRa E22 펌웨어 완성 — Config 모드 정정 + write 응답 prefix C1 발견
- 참조: [[oldProject]], [[양산제품]], [[skills]]
- 어제 lock 결론은 mode mapping 오해였음을 확인. UART loopback 테스트로 nRF UART 정상 입증 (PCA10040 SB7/SB12 점퍼 가설 기각)
- ★ Config 모드 = **M0=0, M1=1** (Mischianti vs xreef dual-test로 검증) / Deep Sleep = M0=1, M1=1 (UART OFF)
- ★ EBYTE write 응답 prefix = **C1** (C0 아님, 공식 매뉴얼 인용 검증)
- 4 모듈 (E22-400T x3 + E22-900T x1) 모두 REG0 = 0xE0 (115200 baud + 0.3k air rate, 거리 max) 영구 저장 통일
- AT_COMMANDS.md 정정 (mode 표 + AUX 거동 + write prefix)
- 인사이트: AT_COMMANDS.md 같은 1차 자료를 100% 신뢰하면 안 됨, 다른 자료 교차 검증·dual-test가 결정적
- 실수 학습: 사용자 동의 없이 P0.06/P0.08 → P0.03/P0.04 변경 후 사용자 불만 → 향후 wiring·핀맵 변경은 명시 동의 필수

## [2026-05-10] project | 한림용인CC 골프장 수조 자동급수 무선제어 시스템 신설
- 참조: [[projects]], [[양산제품]], [[strengths]], [[oldProject]]
- 발주자: **한림용인CC** (골프존카운티 한림용인, 1998 개장, 27홀 사파이어/루비/다이아몬드, 처인구 남사면)
- 시공자 UTTEC, 시공 직전 단계, 견적 VAT 포함 1,000만원 (UTTEC 자체 작성)
- UTTEC 역할: **펌웨어·하드웨어 통합** — 오늘 완성한 nRF52832 + E22 LoRa 펌웨어를 양산용 자산으로 활용 가능
- 인프라 구성: 펌프 2 + 중계기 2 + 고가수조 2 + 저장탱크 3 = 7~8 노드, LoRa 920 MHz (한국 KC 인증 필수)
- 프로젝트 폴더: `C:\todo\today\project\골프_수조_물관리\`
  - README.md (10개 섹션) + 시공_체크리스트.md + 설계_요구자료.md + 설계/수위측정_방법.md
  - references/ 견적서 PDF + 급수 인프라 지도
- 핵심 결정:
  - 920 MHz E22 (한국 KC 인증) 모듈 5~7개 발주 ★ 시공 차단 (현재 보유 433/873 MHz는 미인증)
  - 수위 센서: **QDY30A-B** (5m 깊이, 4-20mA, IP68, 단가 ~50,000원, 견적 BOM의 절반 절감)
  - 단계별 구축 권장 (1차 1개소 산업급 1,000만 → 2차 1,500만 확장)
- UTTEC 자산 활용:
  - 오늘 완성한 nRF52832 + E22 펌웨어 → 920 MHz 포팅 (개발비 80만 자체 충당)
  - AMANO BLE Mesh 일본 3,800대 양산·운용 노하우
  - 자체 PCB 설계 (38년 경력)
- 다음 마일스톤: 920 MHz E22 + QDY30A-B 샘플 입고 → 사내 테스트 1주 → 현장 답사 → 1차 시공

## [2026-05-10] system | claude_project_template 신설 — 외부 의존 0 세션 연속성 시스템
- 참조: [[skills]], [[ai-direction]], [[gsd-workflow]] (있으면)
- `C:\todo\today\templates\claude_project_template\` 마스터 템플릿
- 4 파일: CLAUDE.md (프로토콜) + _진행로그.md (세션 entry) + _다음할일.md (우선순위) + 사용법.md
- 핵심 설계: Claude Code의 built-in CLAUDE.md 자동 로드만 활용 → skill·hook·git push·외부 메모리 모두 미사용
- PC·repo·OS 무관, 폴더 어디 있든 동작
- uttec@192.168.0.51:~/uttec/shield/ 로 scp 배포 (RPi4 shield 프로젝트 추정, 회로도 폴더 존재)
- 분리 정책: today repo 안 프로젝트는 myWiki 연계 (/work-start /work-end), 다른 PC·다른 프로젝트는 본 템플릿 사용

## [2026-05-09] research | UTTEC BLE Module Zephyr 펌웨어 + E22 LoRa 통합 시도 (EVE)
- 참조: [[ai-fanstick]], [[양산제품]], [[oldProject]], [[skills]]
- bleModule(nRF52832-QFAA, 2022) Zephyr/NCS 첫 실전 펌웨어 작성: LED blink (P0.18/P0.23 SCAN으로 식별 — 회로도 라벨과 다름) + SW-UART (SPI MOSI 트릭, Bresenham 패턴 0.37% 오차로 115,274 baud 구현)
- E22-400T30D LoRa 모듈 통합 시도: bleModule J28 odd pins 1:1 결선, UART 핀 스왑(P0.08 TX/P0.22 RX), M0/M1/AUX GPIO 제어
- Hello LoRa 송신 펌웨어 작동 (AUX 1→0 확인) — 다만 RF 실측은 미검증 (SDR/수신기 부재, 사용자 정정으로 솔직히 인정)
- E22 Config 진단 시도: 4-mode 매트릭스로 **M0/M1 wiring SWAP 발견** (P0.13=M0, P0.11=M1), 12개 AT 명령(C3/C1/C2/Hayes/ASCII) 모두 Sleep 모드 무응답 → deep sleep 또는 lock 상태 추정
- 환경: Zephyr v4.3.99 mainline + NCS toolchain b620d30767, PCA10100 J-Link OB로 외부 nRF52832 SWD 플래시 검증, APPROTECT는 nrfjprog --recover로 해결
- 인사이트: 회로도 PDF 텍스트 추출만으론 핀 식별 부정확 (시각 위치 손실), SCAN 모드(모든 GPIO 동시 토글)가 강력한 진단 도구. EBYTE 모듈 라벨과 실제 wire가 swap될 수 있음.
- 다음 단계: EBYTE RF Setting Software로 PC 직결 진단 또는 두 번째 E22 페어링 시도

## [2026-05-09] ingest | oldProject 아카이브 신설 — 4 entities 추가 + 양산 5→6개 갱신 (PM2)
- 참조: [[oldProject]], [[일본-시장]], [[whybiz-tracker]], [[군사업]], [[ai-fanstick]], [[양산제품]], [[strengths]]
- 다운로드 폴더에서 5개 분류 큐레이션 → 1,200 files / 574.6 MB 보존
  - 태양광(26MB), 일본/도카이(50MB) + AMANO(13MB), rfTech(406MB), whybiz(78MB), 회로도(0.7MB)
- 큐레이션 정책: 외부 공개 자료(WeAct·ABOV·Quectel Qnavigator) 제외 + 명백한 중복 제외 + 시연 영상 추정 ppt 제외 → 1.12GB → 575MB (49% 절감)
- GitHub 신규 repo: `ihong9059/oldProject` (private, 단일 push 성공) → ihong9059 = today + ext + oldProject 3개 체계
- today repo `.gitignore` 처리: `oldProject/` 분리 추적
- **신규 entities 4건**: [[oldProject]] (인덱스), [[일본-시장]] (영업), [[whybiz-tracker]] (IoT IP), [[군사업]] (방산 IP)
- **기존 entities 보강 3건**:
  - [[ai-fanstick]] — 응원봉 특허_now 60건/200MB IP 백업 섹션 추가
  - [[양산제품]] — AMANO 일본 BLE Mesh 3,800대를 **6번째 양산 사례**로 추가 (5개 → 6개)
  - [[strengths]] — "양산 5종 → 6종" + "일본 직거래 양산" 진정성 강조
- 인사이트: 단순 보관(repo)에서 **검색·연결 가능한 영업·기술 자산**으로 격상. 위키에서 "AMANO" "응원봉 특허" "ITM-G3" 검색 시 즉시 hit + 원본 파일 위치 안내

## [2026-05-09] cleanup | GitHub 계정 대규모 정리 — today -54%, 26 repo → ext 1개로 통합 (PM)
- 참조: [[strengths]], [[gaps]]
- today repo: 동영상 4.71 GB → C:\todo\videos_backup\ 별도 보관, history rewrite (filter-repo) — 로컬 .git 11 GB → 5 GB
- ext repo 신설 (private monorepo): 26개 repo subtree merge (528 commits, history 보존), filter-repo 적용 후 1.13 GB
- 원본 26개 영구 삭제 (gh auth refresh -s delete_repo + gh repo delete 26회)
- 결과: ihong9059 = today + ext 2개, GC 후 합계 약 3 GB 예상 (이전 8.2 GB)
- 부가 인프라: 응답 진행 로그 분리 정책 + `_current_progress.md` 임시 파일 + work-start/end SKILL 통합

## [2026-05-09] ingest | YouTube 요약 2건 — Claude Code 새 기능 + 카파시 LLM-Wiki 진실
- 참조: [[유투브]], [[claude-code]], [[ai-direction]], [[obsidian-시리즈-사업화]]
- 영상 1: **Claude Code 새로운 기능 소개 (Anthropic "Code w/ Claude" Dixon Sai 발표, 24:56)** → `02_Claude_Code/`
  - 두 축: ① 개발자 경험(Remote Control / TUI Full Screen / Voice / Desktop 사이드바·댓글·**챕터 고정→목차**)
  - ② **자율성**: Auto Mode 권한 분류기, Worktree 병렬, **Auto Memory(`memory.md` + 점진적 공개)**, `/ultra review`, **Routines**(cron/webhook/API), `/loop`, Tool Search
  - 핵심: "사용자가 직접 PR을 검토할 필요가 없어졌다" — 4종 세트가 묶여 인간 승인 횟수 자체를 축소
- 영상 2: **카파시도 못 말한 LLM-Wiki의 진실 (GilliLab 정보관리기술사, 30:00)** → `01_LLM위키_지식관리/`
  - 진단: 입력 마찰 > 검색 가치 → PKM 90%가 3개월 안에 사망. Karpathy Gist + Garry Tan G-Brain 동시 폭발 = 수렴 진화
  - 스택: Obsidian + Qdrant + **BGE-M3**(한국어 핵심) + MCP + Ollama vs Cloud LLM
  - 한국어 함정: KoNLPy 형태소 분석 + 문단 단위 청킹 + 15~20% 오버랩
  - 벤치: Recall@K — 키워드 0.51 / RAG 0.74, 키워드 강쿼리에선 키워드가 0.89로 우세 → **하이브리드가 답**
  - 비용: 5,000개 노트 인덱싱 12,000원/회 + 6개월마다 재구성 = 연 24,000원 매몰비용
  - 결론 3원칙: ① **시스템보다 습관** ② 지속가능성 ∝ 1/마찰 비용 ③ ROI는 **검색 횟수**로 측정
- 인사이트 연결: [[obsidian-시리즈-사업화]]에서 진단한 "옵시디언 시리즈 사업화 가능성"의 **반대측 데이터** 제공 — 도구가 아니라 *습관 + 큐레이션 비용*이 핵심 변수임을 재확인. 4-Agent 시스템 IP의 차별화 포인트도 *수집보다 큐레이션 자동화*로 좁혀야 함

## [2026-05-09] decision | 「모두의 창업 프로젝트」 A안(AI 응원봉) 메인 신청 — 이진서 협업
- 참조: [[ai-fanstick]], [[2026-05-09_이진서협업-창업프로젝트도전]]
- 공모전: 중기부 공고 제2026-208호 일반/기술트랙, 마감 2026-05-15 16:00 (D-6)
- 협업: 이진서 (서울대 졸업학기, 만 25세, 예비창업자) 51% + UTTEC 49% 신규 법인
- 이진서 매칭 핵심: 응원단장(7대)+기획단장(6대) 9년 운영 = "응원단장이 만드는 응원봉" 진정성
- 4개 아이템 비교 후 A안 (30/30) 선정, B/C/D안은 별도 트랙 보존
- 산출물: `이진서/창업project/items/A_*.md`, `A안_도전신청서_초안_v1.md`, `이미지시안/index.html`

## [2026-05-09] research | 이진서 포트폴리오 분석 — 검토서 누락 강점 4건 발견
- 참조: [[2026-05-09_이진서협업-창업프로젝트도전]]
- 발견: 응원단장 직접 운영(검토서는 "음악 관심"으로만), 수학 강사 8건+수학대왕 마케팅 인턴, 영상 풀세트, 본인 비전=락 미디어 회사
- 결과: 검토서 1순위(응원봉) 추천 유지하되, B안(AI 영상교육) 강력 후보로 추가 발굴
- 다음: 5/10 이진서 미팅 후 본인 표현으로 도전신청서 v2 재작성

## [2026-05-09] insight | 갭 → 협업으로 돌파한 첫 사례
- 참조: [[gaps]], [[ai-fanstick]], [[2026-05-09_이진서협업-창업프로젝트도전]]
- 인사이트: gaps.md "사업년수 10년" 한계는 1인 사업으로 영구 미해결 → 협업 구조로 갭을 자산으로 전환
- AI FanStick 단일 IP가 두 트랙 분기: ① 양산(스마트폰 Gemma 2B 하이브리드, 5/8 정지선) + ② 신규 법인 창업 도전(이진서 협업, 5/9)
- 향후 확장: B안(영상교육)·D안(키오스크)·C안(콘서트 SaaS) 모두 적합한 청년 파트너 발굴 시 적용 가능

## [2026-05-08] use | 위시캣 #155157 지원 (해양 안전 신호시스템 시제품 펌웨어 + HW 조립, 600만/40일)
- 참조: [[위시캣활동]], [[ai-fanstick]], [[revita]], [[onDevice-ai-검증]], [[양산제품]], [[회사소개]], [[영업전략]]
- 매칭률: **8/8 (100%)** — ESP32, Arduino/C++, FreeRTOS, HTTP/HTTPS, JSON, LTE, WiFi, 시제품 펌웨어+HW 조립
- 핵심 매칭 자산:
  - ESP32 + FreeRTOS + LTE 통합: AI FanStick(특허) + RAK4630 LTE/MQTT 양산 운영 (#153090 위시캣 수주중)
  - 시제품 회로+펌웨어+조립 수직 통합: 양산 5종 (회로 25년 임호균 + 펌웨어 38년 홍광선)
  - 야외 IoT 양산 실적: 일본 자전거주차장 BLE Mesh 3,800대 (해양/갯벌 24/7 패턴 매칭)
  - On-Device AI PoC 5/8 완료 → 향후 음향/움직임 anomaly detection 온디바이스 옵션 제시
- 마감: 2026-05-22 / 클라이언트: OriginDesign(서울 마포구) / 외주
- **결과: 2026-05-08 사이트 제출 완료**

## [2026-05-08] research | 위시캣 신규 검토 #155114~#155181 (68건) — 적합 1건(#155157), 검토 1건(#155155 키오스크 SW)
- 참조: [[위시캣활동]], `위시캣/2026-05/가능프로젝트/2026-05-08_가능프로젝트.md`
- 결과: ✅ 1 (#155157 ESP32 해양 안전), ⚠️ 1 (#155155 멤버십 키오스크), ❌ 20, 🔒 비공개 45, ⬛ 미존재 1
- 다음 검색 시작 ID: #155182

## [2026-05-08] research | onDevice AI 확장 영역 시장조사 — 응원봉 부분 통합 5종 + 타 분야 우선 3개
- 참조: [[ai-fanstick]], [[onDevice-ai-검증]], [[자영업-AI플랫폼]], [[uttec-stage-package]], [[2026-05-08_onDevice-AI-확장영역]]
- 발견: microGPT/SLM 4K~150K 클래스는 "풀 비서"가 아닌 "전용 작은 모델 5종 조합"으로 위치시켜야 가치 발생
- 응원봉 시스템 내: Wake Word / KWS / 제스처 / LED 패턴 / VAD 5종 (ESP32-C3 그대로 가능)
- 응원봉 외 우선순위: ① 자영업 음성주문 키오스크 (obsidian 플랫폼 결합, 6개월 1,500만), ② 산업용 음성명령 HMI (한국기계 Stage 4 첫 사례), ③ 노약자 컴패니언 (정부지원 매칭)
- 시장 데이터: Voice AI Smart Homes $29.5B (2026, CAGR 47.6%), Smart AI Toy $18.5B → $55.2B (2035), Edge AI 70% voice query on-device
- 산출물: `응원봉/마케팅검토/2026-05-08_onDevice_AI_확장영역_시장조사.md`, `thoughts/2026-05-08_onDevice-AI-확장영역.md`
- 다음 점검: 5/15 obsidian 자영업 모듈 보강 / 5/20 한국기계 미팅 자료 / 분기 (2026-08-08)

## [2026-05-08] decision | 응원봉 ↔ onDevice_AI_검증 정지선 = Phase 2 종료
- 참조: [[ai-fanstick]], [[onDevice-ai-검증]], [[2026-05-08_응원봉-온디바이스AI-정지선]]
- 판단: microGPT 4K 파라미터로는 응원봉 사용자 기대 응답 품질 미달 (6~7자릿수 체급 차). 양산 BOM +1,500원/대(5만 대 +7,500만)에 사용자 가치 미입증. **검증 vault는 PR·B2B 영업·강의 자산용 트랙으로 분리 운영, 양산 방향은 스마트폰 Gemma 2B 하이브리드 잠금.**
- 산출물:
  - `응원봉/마케팅검토/2026-05-08_온디바이스AI_정렬도검토.md` (1차 자료)
  - `응원봉/마케팅검토/README.md` (폴더 운영 규칙)
  - `thoughts/2026-05-08_응원봉-온디바이스AI-정지선.md` (인사이트 영구화)
  - entities/ai-fanstick.md, entities/onDevice-ai-검증.md (정지선 + 카피 분리 정책 추가)
- 다음 점검 트리거: Phase 2 PoC 완료 / Stage 4 첫 수주 / 분기 정기점검 (2026-08-08, 2026-11-08)

## [2026-05-07] use | 위시캣 #155091 지원 (AI 오디오 믹싱 PoC, 2,000만/60일)
- 참조: [[위시캣활동]], [[experience]], [[회사소개]], [[memory-mcp]], [[remotion-project]], [[ai-fanstick]]
- 판단: C++ DSP(삼성 Audio Controller) + LLM API + Node.js/React 풀스택. PoC 수준 + 외주 원격.
- 보강 (5/7 06:00): myWiki 검색으로 누락 자산 3건 발견 — (1) Remotion+edge-tts 음성 합성 파이프라인 30편+ 운영 (가장 큰 누락), (2) Memory MCP 지식 그래프 운영 + Palantir Foundry Ontology (Neo4j [△]→[O]), (3) measure-audio.py + AI FanStick 특허. 11곳 보강 → **매칭률 8/10 → 9/10**, 강점 5→7, 관련 실무 4→7, 주요 경력에 [지식 그래프 / 도메인 모델링] 카테고리 신규.
- 추가 (5/7 12:30): 발주처 사전 질의 Q1(오디오 DSP 경험)·Q2(웹 실시간 시스템 설계) 답변 작성 +221줄 — 4-레이어 입체 답변 + 6계층 아키텍처 + 60일 5-Phase 검증 계획 + 리스크 4건.
- **결과: 2026-05-07 13:30 사이트 제출 완료**

## [2026-05-07 18:05] correction | uttecBizWiki scope 정정 — onDevice AI 제품 전용으로 좁힘
- 사용자 명확화: "uttecBizWiki는 onDevice_AI_검증 개발 제품에 대해서만 진행. 다른 biz는 관여하지 않음."
- 이전 scope (오해): UTTEC 사업 전반 (영업·매출·고객·플랫폼·경쟁사·의사결정 광범위)
- 올바른 scope: **onDevice AI 제품(AI FanStick 차세대 + Stage 4) 비즈니스 전용**
- 다른 사업 영역은 본 vault 미포함:
  - 위시캣 일반 → myWiki/위시캣활동
  - 한국기계 Stage 0 → 영업/Stage0_견적서 + myWiki
  - 강사양성 → aiStudy/.../강사양성_파일럭/ + myWiki
  - 정부지원 → 영업/정부지원_교육사업/
  - uttec-edu, REVITA, 스마트팩토리 등 → myWiki
- 갱신:
  - `uttecBizWiki/README.md` — scope 명확화 + 포함/미포함 매트릭스
  - `uttecBizWiki/CLAUDE.md` — 책임/비책임 + 분리 원칙
  - `uttecBizWiki/index.md` — 단일 제품군 인덱스
  - `uttecBizWiki/log.md` — correction 로그
  - `myWiki/entities/uttecBizWiki.md` — scope 정정 반영
- 핵심 결론: **uttecBizWiki는 단일 제품군(onDevice AI) 전용 vault**. onDevice_AI_검증과 1:1 한 쌍. myWiki는 다른 모든 사업 영역(위시캣·강사양성·정부지원·다른 제품) 그대로 처리.

## [2026-05-07 17:50] start | uttecBizWiki 본격 진입 — 3-vault 분리 운영 확정 (기술↔비즈니스)
- 참조: [[uttecBizWiki]], [[onDevice-ai-검증]], [[ai-fanstick]], [[uttec-stage-package]]
- 결정: 5/5 검토 노트 보류 → 5/7 본격 진입
- 트리거: onDevice_AI_검증 vault 신설(5/7 17:30)로 기술 vault 명확해짐 → 비즈니스 vault도 별도 분리 필요성 확정
- 3-vault 구조 확정:
  - `myWiki/second-brain/` — 학습+개인+도구 통합 second-brain (영구)
  - `uttecBizWiki/` — **사업 운영** 전용 (영구) — 외부 공개 시 안전
  - `onDevice_AI_검증/` — **기술 검증** 단기 프로젝트 (archive 가능)
- 산출:
  - `uttecBizWiki/README.md` 갱신 (보류 → 본격 진입)
  - `uttecBizWiki/CLAUDE.md` 신규 (사업 운영 schema)
  - `uttecBizWiki/index.md` 신규 (페이지 인덱스)
  - `uttecBizWiki/log.md` 신규 (시간순 활동)
  - `uttecBizWiki/entities/AI_FanStick.md` 신규 — 첫 사업 영역 (Stage 4 영업과 직결)
  - `onDevice_AI_검증/README.md` 갱신 — uttecBizWiki와의 cross-link 추가
  - `myWiki/second-brain/entities/uttecBizWiki.md` 신규 — vault entity
- 핵심 결론: **같은 제품(AI FanStick / Stage 4)을 두 vault에서 동시 추적**. onDevice_AI_검증 = 기술 가능성, uttecBizWiki = 비즈니스 가능성. 검증 결과 → 영업 자료 갱신 → 수주 → 다음 검증 사이클의 흐름 확립.
- 다음 액션: 5/8~10 raw/ 첫 영업 이벤트 (한국기계 회신 / 위시캣 결과), 5/13 thoughts/ 첫 인사이트

## [2026-05-07 17:30] ingest | onDevice_AI_검증 vault 신설 — microGPT + AI FanStick 차세대 + Stage 4 통합
- 참조: [[onDevice-ai-검증]], [[ai-fanstick]], [[uttec-stage-package]], [[On-Device AI]]
- 통합 대상 (3개 작업 항목 → 1개 vault):
  - 작업보고서 #18 microGPT 직접 실행 테스트
  - Notion #21 AI FanStick 다음 버전 SLM 통합 검토 (ESP32-S3 hello_world)
  - 작업보고서 #23 UTTEC 사업용 새 vault 시작
- 산출: `onDevice_AI_검증/` 신규 vault (8 파일):
  - README.md / CLAUDE.md / 0_검증계획.md / log.md (마스터 4)
  - microGPT/01_검증절차.md (Phase 1A·1B)
  - aiFanStick_차세대/01_검증절차.md (Phase 2)
  - 통합검증/01_SRAM_파라미터_매트릭스.md (모델 후보 비교)
  - 통합검증/02_Stage4_영업매핑.md (검증→영업 흐름 4곳)
- myWiki entity 신설: `entities/onDevice-ai-검증.md`
- 핵심 결론: **3개 작업이 같은 ESP32-S3 + On-Device AI 검증 사이클**. microGPT 4,192 파라미터 = ESP32-S3 SRAM 520KB 1% 미만 사용 → AI FanStick "외부 인터넷 0%" 카피 검증 가능 → Stage 4 (1,500만) 영업 패키지의 기술 근거. uttecBizWiki는 별개 보존 (사업 일반 wiki).
- 진행 흐름: Phase 1A (PC microGPT 실행, 즉시 가능 1~2h) → Phase 2 (ESP32-S3 보드 도착 후, 4~8h) → Phase 3 (Stage 4 영업 자료 갱신)
- 영업 임팩트: 검증 성공 시 6개월 2,000~3,500만 매출 잠재 (Stage 4 첫 수주 + 강사양성 Day 5 + 호오컨설팅 + 인프런 사례)

## [2026-05-07 17:00] ingest | 정부지원 톱 3 진입 액션 정리 + 이번 주말(5/10~11) 마감 확인 액션 추가
- 참조: [[정부지원_교육사업]], [[영업전략]], [[uttec-edu]], [[강사양성_파일럿]]
- 산출:
  - `영업/정부지원_교육사업/톱3_진입액션.md` (신규) — 톱 3 채널별 즉시 액션 + 시나리오 분기 + 이번 주말 통합 플랜
  - `myWiki/second-brain/entities/정부지원_교육사업.md` (신규) — 9채널 매트릭스 한 페이지 + 톱 3 진입 상태 + 자료 위치
  - 작업보고서 #4 갱신 (★★ 강조 + 이번 주말 5/10 반드시 명시)
  - 작업보고서 #29 신규 (★★ 서울시·NIPA 마감 확인 — 이번 주말 5/11 반드시)
- 핵심 결론: **이번 주말이 톱 3 진입 골든 타임**. 디지털배움터(1순위)는 풀세트 완성으로 즉시 가입·컨택 가능. 서울시·NIPA는 마감 시점 미확인 (5월 시점 마감 지났을 가능성 70~80%) — **5/11 일 마감 확인이 결정타**. 살아있으면 즉시 신청, 지났으면 2027년 1월 대기 + 디지털배움터 단독 집중.
- 매출 잠재력: 6개월 누계 600~1,200만 (디지털배움터 단독) ~ 6,000~9,000만 (풀 톱 3 진입)
- 다음 의사결정: 5/13(월) — 마감 확인 결과 종합 후 다음 단계 결정

## [2026-05-07 16:30] ingest | 강사양성 파일럿 entity 신설 + 모집 메시지 템플릿 작성
- 참조: [[강사양성_파일럿]], [[uttec-edu]], [[uttec-stage-package]], [[obsidian-시리즈-사업화]]
- 산출:
  - `myWiki/second-brain/entities/강사양성_파일럿.md` (신규) — 한 페이지 요약 (시범 일정·5일 코스·옵션 D 결정·모집 전략·비용·KPI·의사결정 시점)
  - `aiStudy/introductionAi/강사양성_파일럿/모집/2_모집_메시지_템플릿.md` (신규) — 한국기계·태명과학·위시캣 동료·공개 모집 + 후속 메시지 5종
  - `aiStudy/introductionAi/강사양성_파일럿/0_시범계획서.md` (갱신) — §5에 옵션 D 결정 섹션 추가 (obsidian 시리즈 미포함 명시)
  - `aiStudy/introductionAi/강사양성_파일럿/README.md` (갱신) — 폴더 구조 + 핵심 결정 사항 시간순 표
- 핵심 결론: **시범계획서 + 모집 메시지 + entity = 모집 즉시 시작 가능 상태**. 한국기계·태명과학에 Stage 0 PDF 회신과 동시에 시범 안내 발송, T-3주(5/26)까지 수강생 4명 확정 목표.
- 다음 액션: (1) 한국기계·태명과학 시범 안내 발송 (사용자 직접) (2) 위시캣 동료 1~2명 컨택 (3) 장소 후보 3곳 답사 (4) T-3주 시점 4명 미달 시 의사결정

## [2026-05-07 15:50] decision | 3.5-Stage → 4.5-Stage 패키지 확장 — Stage 4 (On-Device AI) 신설 채택
- 참조: [[uttec-stage-package]], [[On-Device AI]], [[Stage0_Core_Services_견적서]], [[ai-direction]]
- 배경: 작업보고서 #19 검토. myWiki ontology에 "Stage 4 신설 후보"로 등록되어 있던 항목 (5/4 Foundry 5층 학습 시 도출). 사용자 강점(임베디드 38년 + AI 통합) + 시장 트렌드(Hailo·Jetson·SLM) + microGPT 검증으로 신설 타당성 입증.
- 채택안: Stage 4 (On-Device AI) 신설, **단가 1,500만 / 기간 4주**. 패키지 명칭 4.5-Stage로 갱신 (Stage 0 0.5 + Stage 1·2·3·4 = 4.5). Stage 4 산출물: 보드(Hailo-8/Jetson Orin/ESP32-S3 중 1종) + 모델(SLM/microGPT fine-tuning) + C++ 추론 엔진 + Stage 0 인프라 통합 + 매뉴얼·영상 + 30일 무상 지원.
- 산출: `영업/Stage4_OnDeviceAI_검토.md` 신규 (1.5h 검토 결과 종합), `myWiki/second-brain/entities/uttec-stage-package.md` 신규 (4.5-Stage 매트릭스 + 영업 시나리오 4종), Stage 0 견적서 미포함 섹션에 Stage 4 옵션 한 줄 추가, ai-direction.md 판단 로그
- 매출 임팩트: 5,800만 (3.5-Stage) → 7,300만 (4.5-Stage 풀스택), +1,500만 (+26%)
- 영업 시나리오: A 한국기계 스마트팩토리(2,300만~7,300만) / B 자영업(800만) / C 임베디드 스타트업(1,500~2,000만) / D 대형 고객 풀스택(7,300만)
- 핵심 결론: **Stage 4 신설로 임베디드 특화 고객(스타트업·제조)을 직접 겨냥 가능.** 사용자 38년 임베디드 자산이 영업 패키지에 직접 반영. 다음 수주 후보: 한국기계(Hailo-8 예측정비) 또는 위시캣 임베디드 공고.

## [2026-05-07 14:30] ingest | obsidian 강의 모듈 (2~3h) 작성 — 옵션 D 산출물 폴더 구조로 분리 완성
- 참조: [[obsidian-시리즈-사업화]], [[강사양성_파일럭]]
- 산출: `obsidian/강의모듈_2~3h/` 폴더 (5 마스터 파일 + vault_template/ 2 파일 = 총 8 파일)
  - `0_README.md` — 폴더 인덱스 (시간 옵션·학습 목표·강의 흐름·시리즈 매핑)
  - `1_슬라이드.md` — 16장 슬라이드 (Reveal.js / Marp 호환 Markdown, `---` 구분)
  - `2_강사_스크립트.md` — Part 1·2·3 발표 대본 + 시간 분배 (2.5h 기준)
  - `3_실습_가이드.md` — 라이브 데모 6 step + 수강생 실습 절차 + 시간 다이어트 시나리오
  - `4_채널별_활용안내.md` — 호오컨설팅·인프런·디지털배움터·강사양성 2차 채널별 맞춤
  - `5_FAQ_+_체크리스트.md` — Q&A 10 + 강사 사전 준비 (T-1주/T-1일/당일/사후)
  - `vault_template/CLAUDE.md` — 실습용 샘플 schema
  - `vault_template/README.md` — 수강생 5분 시작 가이드
- 시간 옵션: 2h 압축 / 2.5h 표준 / 3h 풀버전
- 활용 채널 매핑: 호오컨설팅(2h) / 인프런(3h) / 디지털배움터(3~8h) / 강사양성 2차 차수(장기)
- 핵심 결론: **6편 시리즈(5,059줄) → 1 폴더 8 파일로 압축·분리 완료** = 영업 즉시 투입 가능. 강사가 6 파일을 순서대로 익히면 2~3h 강의 진행 가능. 수강생은 vault_template/을 5분 만에 복사해서 시작. 호오컨설팅 강연 모집 게시판 확인이 다음 단계.

## [2026-05-07 13:50] decision | obsidian 시리즈 강사양성 통합 — 옵션 D 채택 (첫 시범 미포함)
- 참조: [[obsidian-시리즈-사업화]], [[강사양성_파일럭]], [[ai-direction]]
- 배경: 작업보고서 #10 "강사양성 Day 4·5 콘텐츠에 obsidian 6편 시리즈 통합"의 의미가 모호. 시범계획서 검토 결과 Day 4·5는 이미 Track D+E (Slack/Colab/NLM/Remotion/AWS)로 8시간씩 빈틈없이 채워져 있어 시간 충돌. Track F 처리 패턴(시나리오 C — 첫 시범 검증 우선, 신규 콘텐츠 미포함)과 일관성 유지 필요.
- 채택안 (옵션 D): obsidian 6편 시리즈를 첫 시범에서 미포함. 별도 단기 모듈(2~3h)로 분리하여 호오컨설팅 단발 강연 / 인프런 강의 / 디지털배움터 차별화 자료로 활용. 첫 시범 안정 후 2차 차수에 통합 검토.
- 변경: 작업보고서 #10 문구 갱신, entities/obsidian-시리즈-사업화.md §5·결정사항·관련 3곳 반영, ai-direction.md 판단 로그 추가
- 영향: 시범계획서(`aiStudy/introductionAi/강사양성_파일럭/0_시범계획서.md`) 변경 없음 — 13가이드 검증 우선 정책 일관성 유지
- 핵심 결론: **시범은 검증 우선, 신규 콘텐츠는 보수적 도입**. obsidian 시리즈는 강사양성에 종속되지 않은 독립 영업 자산으로 보존 → 활용처 다양화 (단발 강연·인프런·정부지원 차별화).

## [2026-05-07 06:00] ingest | 위시캣 #155091 지원서 영업 자산화 — 동일 위키 검색 패턴 재확인 (1일 2건)
- 참조: [[위시캣활동]], [[memory-mcp]], [[remotion-project]], [[ai-fanstick]], [[skills]], [[strengths]], [[experience]], [[ai-direction]], [[2026-05-07_OOK-두-응용-영역]]
- 내용: #155057 보강 패턴을 #155091 (AI 오디오 믹싱 PoC, 2,000만/60일)에 재적용. myWiki 검색으로 누락 자산 3건 발견 — (1) Remotion+edge-tts 음성 합성 파이프라인 30편+ 운영 (가장 큰 누락, 오디오 DSP 매칭 핵심), (2) Memory MCP 지식 그래프 운영 + Palantir Foundry Ontology 학습 완료 (Neo4j [△]→[O] 격상), (3) measure-audio.py mp3 측정 + AI FanStick 음성+AI+BLE 특허 (통합 제품 사례). 지원서 11곳 보강 → 매칭률 8/10 → 9/10, 운영 서비스 3→6, 강점 5→7, 주요 경력에 [지식 그래프 / 도메인 모델링] 카테고리 신규.
- 핵심 결론: **위키 영업 자산 발견 패턴이 1일 2건 재현** — 같은 날 다른 도메인(통신 프로토콜 vs 오디오+지식그래프) 두 건 모두 셀프 디스카운트 해소. 패턴의 도메인-독립성 입증 = 시스템 결함이라는 강한 증거. `/wishket-apply` 스킬에 myWiki 선검색 단계 추가 필수.

## [2026-05-07 04:00] ingest | AISG 3.0 + OOK 두 응용 영역 통합 — 위시캣 #155057 영업 자산화
- 참조: [[aisg]], [[revita]], [[위시캣활동]], [[skills]], [[experience]], [[strengths]], [[ai-direction]], [[2026-05-07_OOK-두-응용-영역]]
- 내용: 위시캣 #155057 (AISG 3.0 통신 프로토콜 포팅) 사전 학습 결과 영구화. 신규 entity [[aisg]] (3계층 스택, HDLC 프레임, 2.0→3.0 변경점, 보유 매칭 11/11), 신규 thought [[2026-05-07_OOK-두-응용-영역]] (REVITA OOK Replay 447MHz + AISG OOK 2.176MHz 두 응용 영역 통합 → 통신 프로토콜 7종 보유 인사이트). skills/experience/strengths/ai-direction/index cross-link 갱신. 위시캣 지원서 9곳 보강으로 매칭률 9/10 → 11/11.
- 핵심 결론: **위키가 영업 자산을 발견한다** — REVITA OOK Replay(4/27~5/1)와 AISG OOK PHY(5/7)의 1주 시차 누락을 위키 단순 검색이 트리거. ingest 누락 시 영업 반영 0 → 향후 모든 위시캣 지원 전 myWiki 선검색 워크플로우 정착 필요.

## [2026-05-07] use | 위시캣 #155057 지원 (AISG 3.0 통신 프로토콜 포팅, 2,400만/90일)
- 참조: [[위시캣활동]], [[양산제품]], [[회사소개]], [[experience]], [[aisg]], [[revita]]
- 판단: C++/MCU/RS-485/UART 핵심 역량 정확 매칭. AISG 3.0 변경점만 학습 필요. 용인 기흥 현장으로 사무실 동일 지역. 마감 5/15 긴급.
- 보강 (5/7 04:00): myWiki 검색으로 REVITA OOK Replay(447.925MHz, 4/27~5/1) 자산이 지원서에 누락됨을 발견. 9곳 보강(OOK 직접 경험 + AISG 두 PHY 모두 대응) → **매칭률 9/10 → 11/11**, 통신 프로토콜 6종 어필. 신규 entity [[aisg]] + thought [[2026-05-07_OOK-두-응용-영역]] 작성.
- **결과: 2026-05-07 13:30 사이트 제출 완료**

## [2026-05-07 01:30] ingest | obsidian 폴더 6편 시리즈 완성 — 새 사업 라인 + 강사양성 차별화 콘텐츠
- 참조: [[Obsidian myWiki]], [[Memory MCP]], [[강사양성_파일럭]], [[3.5-Stage 패키지]], [[uttec-edu]]
- 내용: `obsidian/` 폴더에 6편 시리즈 작성(201.1 KB, 5,059 lines): (1) Obsidian 상세설명서 (2) 제조업 프로젝트 자료정리 기준 (REVITA 사례) (3) Ontology vs Obsidian 관계 검토보고서 (4) myWiki 작동원리 상세설명서 (4-Agent 시스템) (5) 자영업·중소기업 AI 플랫폼 사업가능성 검토 + 진행계획 (6) 중소기업 AI운영 교육지침서 (학원·자동차 정비소 포함 10개 업종 시뮬레이션 + 강사 대본 + FAQ 30). 시리즈 구조: 이론(1) → 적용(2) → 심화(3) → 메타(4) → 사업화(5) → 실행(6).
- 핵심 결론: **사용자 myWiki = 4-Agent emergent 시스템 (Substrate + Schema + Agent + Director)** 이며 이것이 곧 **새 사업 라인의 핵심 IP**. 자영업·중소기업 AI 플랫폼 가능성 23/25 — 사용자 사업 후보 1위. Phase 0 비용 거의 0으로 즉시 검증 가능. 강사양성 파일럭(06-15~) Day 4·5 콘텐츠로 통합 시 한국 시장 차별화. Foundry 무료 재현 모델의 자영업 진입 단계(Stage -1)로 3.5-Stage 패키지 funnel 입구 구축 가능.

## [2026-05-06 23:00] cleanup | figma 폴더 삭제 + obsidian 빈 폴더 신설
- 참조: [[skills]], [[ai-direction]], [[ai-landscape]]
- 내용: `C:\todo\today\figma\` 폴더 삭제(Figma_설명서.md + Slack_설명서.md 포함). 사유: 2026-04-19에 Claude Design 발견으로 Figma 학습 보류 결정 후 미사용 상태였고, Slack도 협업 도구 참고용으로 보존 가치 낮음. 동시에 `C:\todo\today\obsidian\` 빈 폴더 신설(향후 옵시디언 콰르텟·플러그인·강사양성 Day 4 자료 적재 예정).
- 위키 정리:
  - 삭제: `entities/figma.md`
  - 수정: `CLAUDE.md`(raw 스키마에서 figma 라인 제거), `index.md`(엔티티 테이블 figma 행 제거), `skills.md`(도구 테이블 Figma 행 제거)
  - 유지(역사적 판단 기록): `ai-direction.md`(2026-04-19 판단 로그), `ai-landscape.md`(Claude Design vs Figma 비교), `gaps.md`(Figma MCP 학습 불필요 결정), `log.md`(2026-04-22·2026-04-19 기존 항목), `entities/유투브.md`(YouTube 영상 제목 참조)
- 핵심 결론: 미사용 폴더는 즉시 삭제 + 위키 cleanup 동시 진행으로 고아 참조 방지. 보존할 자산(역사적 판단 로그)과 정리할 자산(엔티티·스키마·인벤토리)을 구분하는 패턴 정립.

## [2026-05-06 22:00] correction | 사용자 이름 오류 일괄 수정 — Memory MCP 시드 오염 추적 발견
- 참조: [[me]], [[Memory MCP]], 메모리 시스템
- 내용: 어제(2026-05-05) Memory MCP 첫 시드 작성 시 사용자 entity 이름을 "이형근"으로 잘못 입력한 사고가 발견됨. 실제 사용자 본명은 **홍광선** (UTTEC 대표). 이메일 prefix `ihong9059@gmail.com`에서 한국 이름 추정 오류로 추정됨. 27개 파일 sed 일괄 치환(PC 자료 22 + 강사양성 시범계획서 + n8n/docs 3 + 서버 wishket-prompt.txt) + Memory MCP json 동기화 + memory_seed.jsonl 동기화 + Claude Code 메모리에 사용자 본명 명시 메모리 신설(`user_name_hong_kwangsun.md`)로 재발 방지.
- 핵심 결론: **Memory MCP 시드의 정확성이 미래 세션의 모든 추론에 영향**. 시드 작성 시 사용자 본명·핵심 식별자는 사용자 직접 확인 후 입력 필수. 또한 Claude Code memory에도 명시 저장하여 시드 오염 시에도 fallback 가능.

## [2026-05-06 21:00] ingest | 3Blue1Brown 딥러닝 시리즈 9편 일괄 분석 — 강사양성 Day 5·6 콘텐츠 확정
- 참조: [[uttec-edu]], [[강사양성_파일럿]], [[Track F On-Device AI]], [[microGPT]]
- 내용: 3Blue1Brown(Grant Sanderson) 채널의 신경망·딥러닝 시리즈 전 9편(Chapter 1~7 + LLM brief + Welch Labs guest) 일괄 분석. 총 3시간 44분 콘텐츠. 강사양성 파일럿 Day 5·6 (딥러닝 입문) 콘텐츠로 확정. 시청 권장 순서 매핑(LLM brief → Ch.1~3 → Ch.5~6 → 선택 Ch.4·7·Welch). 핵심 통찰 시리즈 매트릭스화: 13,002 파라미터 → 1,750억(GPT-3) 규모의 마법 + Superposition + Mechanistic Interpretability. microGPT 가이드 보강 자료 확보.
- 산출: `유투브/3Blue1Brown_딥러닝_시리즈/` (9편 분석 + README, 총 10개 파일)
- 핵심 결론: 글로벌 표준 자료를 강사양성 파일럿에 통합 → 한국 시장 차별화 가능.

## [2026-05-06 20:30] ingest | 디지털배움터 (NIA + 지자체) 1순위 진입 풀세트 작성
- 참조: [[영업전략]], [[uttec-edu]], [[Track F On-Device AI]]
- 내용: 정부지원 9채널 매트릭스 검토 결과를 받아 **1순위 채널인 디지털배움터** 진입 액션 플랜 풀세트 작성. 7개 파일: README + 사업개요 + 신청절차 단계별(Phase 0~6) + 2주 액션 플랜(Day 1~14) + 수도권 6개 지역사업자 컨택 리스트 + 강사 지원서류 템플릿(이력서·자기소개서·강의계획서) + Claude Code+Obsidian 8시간 시범강의안. 동일 패턴으로 다른 채널(서울시·smart-factory·혁신바우처) 확장 가능.
- 산출: `영업/정부지원_교육사업/01_디지털배움터/` (7개 파일)
- 핵심 결론: 정부 채널 진입을 즉시 시작할 수 있는 풀세트 확보. 6개월 누적 600~1,200만 매출 잠재.

## [2026-05-06 19:00] ingest | REVITA 동글 LDO 교체 검토 — MP2338GTL → 12V to 3.3V 저Iq LDO
- 참조: [[revita]], 회로도 분석
- 내용: REVITA_DONGLE V1.0의 MP2338GTL buck 컨버터를 저Iq LDO로 교체 검토. 발열 검산(35°C 상승, SOT-89로 안전) + 후보 8개 비교 + 3가지 솔루션(A안 펌웨어 EN 제어, B안 2단 변환, C안 단순 LDO 교체). **1순위: MCP1755-3302E/MC** (Iq 1.6μA, SOT-89, 300mA). **권장 솔루션: A안 (펌웨어 EN 제어)** — 회로 변경 없이 standby 5μA 달성 가능. Active duty cycle 측정 후 결정 권장.
- 산출: `revita/회로도/LDO_교체_검토_MP2338GTL_to_LDO.md`

## [2026-05-06 18:00] ingest | 위시캣 자동검색 dedup 시스템 — wishket-check.sh v3
- 참조: [[위시캣활동]], [[n8n]], 자동화
- 내용: 매일 09:00 cron이 어제(5/5) 이미 지원 완료한 #155004 전자칠판 챗봇을 다시 high-fit로 평가하여 중복 알림 발송. 해결: `applied.txt` 기반 dedup 로직 추가(jq로 array 만들고 high-fit 결과에서 제외) + 헬퍼 스크립트 `wishket-applied.sh` 신설(add/list/remove). 향후 지원 시 `ssh uttec@100.89.56.69 "~/n8n/wishket-applied.sh add <ID> '메모'"` 한 줄로 등록.
- 핵심 결론: 자동화 시스템도 **운영 중 발생하는 edge case 보강이 핵심**. 단순 검색을 넘어 "지원 완료 이력 추적"까지 통합되어 진정한 운영 자동화 달성.

## [2026-05-06 20:00] research | 옵시디언 영상 4번째 (구요한 티타임즈TV 55분) — Foundry=옵시디언 객관 검증 + AI 모델 비교
- 참조: [[ai-direction]], [[Pipeline_Builder]], [[3.5-Stage 패키지]], [[강사양성_파일럿]], [[Stage0_Core_Services_견적서]]
- 내용: 어제 분석한 윤자동 영상의 4개월 빠른 버전(2025-06). 같은 게스트(구요한)가 19분 더 깊이 있게 다룬 추가 내용:
  - **AI 모델 비교** (구요한 평가, 2025-06): GPT(설계·보고서·멀티모달) > Claude Sonnet 3.7(코딩) > Gemini(대용량+무료 API). "코딩은 클로드, 프로그래밍은 GPT". 하나만 결제 → GPT 픽
  - **⭐ 팔란티어 Foundry = 옵시디언** (객체+속성+릴레이션 동일 구조) → 사용자의 어제 작성 `Pipeline_Builder_적용_검토.md` 메시지가 1년 전부터 한국 PKM 권위자 사이에 공유되던 인사이트임을 객관 검증
  - **⭐ "옵시디언 회사 망해도 OK — 마크다운 파일이 남으니까"** = 데이터 영구 소유권 철학. Notion 대비 Stage 0 견적서 차별화 카피 도출
  - **국내 최초 옵시디언 컨퍼런스** (2024 개최) — 옵시디언 대표 한국 방문, "투자 거부 + 사용자 헌신" 입장 공개
  - **Various Complements + Templater 플러그인** = 자기 말투 자동완성 + JS+AI API 통합
  - **인생 모토**: "질문은 언제나 환영" + "2주 뒤에 뵙겠습니다" + Learning Agility (러닝 어질리티)
- 산출물: 유투브/옵시디언으로_지식_쌓고_연결하고_꺼내쓰자_구요한_티타임즈TV_상세.md (9 섹션)
- **객관 검증 결과 2가지**:
  1. 사용자 myWiki 운영 = 한국 시장 강의/책보다 발전형 (어제 검증)
  2. 사용자 Foundry 무료 재현 모델 = 한국 PKM 권위자가 1년 전 동일 인사이트 도달, **시장 검증된 영업 메시지**
- **콰르텟 통합**: 강사양성 파일럿 Day 4 = 3.5시간 워크숍 (이론 + 실습 + 영업 응용)
- 다음 액션: (1) Stage 0 견적서에 "데이터 영구 소유권" 섹션 추가 (2) 호오컨설팅 강연 후보 "Learning Agility 1인 사업자" 콘텐츠화 (3) 2026-05 시점 최신 AI 모델 비교 재확인 (Claude 4.7 vs GPT-5 vs Gemini 3.0)

## [2026-05-06 17:30] research | 옵시디언 + AI 영상 트리오 분석 — 강사양성 Day 4 콘텐츠 완성 + myWiki 운영 객관 검증
- 참조: [[uttec-edu]], [[강사양성_파일럿]], [[ai-direction]], [[영업전략]]
- 내용: 한국 옵시디언 + AI PKM 영상 3편 연속 분석 (총 82분):
  - **구요한** (커맨드스페이스, 박사·교육공학, 37분): 두 번째 뇌, 사람·미팅·강의 노트, Claude Artifacts 활용
  - **김문정** (배움의 달인, 교사·플러그인 개발자, 28분): 7시간/일 사용, 자체 플러그인 매일 개발, 보이스 브리핑 + Voice Writing 플러그인 GitHub 공개. **핵심 카피: "AI에게 데이터를 들고 가지 말고, 데이터 레이크로 AI를 불러들여라"**
  - **생산적생산자** (책 저자 + 8주 코칭, 17분): Claude Code + 옵시디언, /init → CLAUDE.md (시스템 프롬프트), 제텔카스텐+PARA 자동 생성, todos.md 자동 추적
- 산출물: 유투브/구요한_상세.md / 김문정_상세.md / 생산적생산자_상세.md (각 13~12 섹션)
- **객관적 발견**: 사용자(홍광선)의 myWiki + CLAUDE.md + 자동 메모리 시스템이 **한국 시장에서 책·8주 코칭으로 팔리는 콘텐츠보다 한 단계 위**임 검증됨
- 핵심 결론: 강사양성 파일럿 Day 4 = 트리오 통합 3시간 워크숍 (오전 기본 → 오후 1부 자동화 → 오후 2부 Claude Code+PKM)
- 다음 액션: (1) Day 4 워크숍 콘텐츠 정리 (2) 호오컨설팅 강연 후보 "바이브 코딩으로 1인 사업자 두 번째 뇌" (3) 인프런 강의 후보 "스마트팩토리 엔지니어를 위한 Claude Code + 옵시디언 PKM" — 임베디드/제조업 특화 차별화

## [2026-05-06 14:00] research | n8n 대안 비교 검토서 — 12개 도구 5 카테고리 + 하이브리드 모델 결론
- 참조: [[n8n]], [[ai-direction]], [[영업전략]], [[Pipeline_Builder]]
- 내용: 사용자가 "n8n은 오래된 시스템"으로 인식 → 객관 검증 후 정정. 12개 도구를 5 카테고리로 비교:
  - 시각적: n8n / Activepieces / Windmill
  - IoT: Node-RED / ThingsBoard
  - 코드: Trigger.dev / Inngest / Temporal
  - SaaS: Zapier / Make.com / Pipedream
  - AI 네이티브: Claude Code Routines (2026-04 출시) / Gumloop
- UTTEC 적합도 매트릭스 25점: n8n(24) > Claude Code Routines(23) = Activepieces(23) > Node-RED(22)
- **결론**: n8n 유지 (현재) + Claude Code Routines 병행 (이번 달 시범 1건) + (Stage 1 진입 시) Node-RED 추가 = 하이브리드
- 산출물: n8n/검토_n8n_대안비교.md (9 섹션)
- 핵심 발견: 2026 자동화 컨센서스는 "n8n vs Claude Code"가 아니라 "n8n + Claude Code" 분업
- 다음 액션: Claude Code Routines 시범 1건 (위시캣 누적 보고 또는 위키 정원사 lint 자동화)

## [2026-05-06 11:00] research | 교육 사이트 종합 매트릭스 — 민간 채널 15건 4 카테고리
- 참조: [[영업전략]], [[uttec-edu]], [[강사양성_파일럿]], [[정부지원_교육사업]]
- 내용: 어제 정부 채널 9건 매트릭스의 자매 문서. 민간 채널 15건을 4 카테고리로 분류:
  - **A B2B 기업교육 (5건)**: 휴넷, 멀티캠퍼스, KMA, KMAC, KPC
  - **B 콘텐츠 플랫폼 (5건)**: 인프런, 패스트캠퍼스, 클래스101, 유데미, 코드잇
  - **C 강사 섭외/매칭 (4건)**: 호오컨설팅, 강사인 등, 탤런트뱅크, 탈잉
  - **D AI 전문 (2건)**: 한국AI교육진흥원, IAAE
- UTTEC 적합도 매트릭스 25점: 인프런(23) > 호오컨설팅(22) = 휴넷(22) = 멀티캠퍼스(22) > KMA(21) = 탤런트뱅크(21)
- 즉시 진입 액션 4건 (이번 주, 4.5시간 소요)
- 6개월 누적 잠재 매출: 3,000~7,400만 (정부 매트릭스 6,000만~1억과 합산 시 **연 1억~2억 잠재 채널**)
- 산출물: 영업/교육사이트_매트릭스/0_검토_노트.md (11 섹션) + README.md
- 다음 액션: 인프런 지식공유자 등록 + 호오컨설팅 강사 풀 + KMA 러닝센터 + 탤런트뱅크 (병행 4건)

## [2026-05-06 09:00] study | microGPT 초보자 가이드 — Karpathy 200줄 GPT 완전 분석
- 참조: [[ai-direction]], [[ai-landscape]], [[On-Device AI]], [[강사양성_파일럿]], [[AI FanStick]]
- 내용: Karpathy가 2026-02-12 공개한 microGPT(200줄 순수 Python, 의존성 0, MacBook 1분 학습, 4,192 파라미터). 10년 시리즈 정점: micrograd → makemore → nanoGPT → microGPT. 자매 nanochat(2025-10, 8000줄, $100, 4시간, ChatGPT 클론).
- 산출물: 작업보고서/temp/microGPT_초보자_가이드.md (11 섹션, 일상 비유 다수)
- UTTEC 활용 5 시나리오: ① 강사양성 Day 4 워크숍 ② Track F Week 2 실습 ③ AI FanStick ESP32-S3 실제 탑재 (4K 파라미터 = SRAM 520KB에 여유) ④ 호오컨설팅 단발 강연 ⑤ 인프런 강의 콘텐츠
- 핵심 발견: **microGPT의 4,192 파라미터는 ESP32-S3에 실제 탑재 가능** → AI FanStick "외부 인터넷 0%, 응원봉 자체 GPT" 카피 검증 가능
- 다음 액션: (1) microGPT 직접 실행 테스트 (2) AI FanStick ESP32-S3 입수 시 포팅 검토

## [2026-05-06 08:00] use | TwinCAT 자동시작 완전 차단 — 레지스트리 Run 키 점검 패턴 학습
- 참조: [[작업환경]], [[Windows]]
- 내용: PC 부팅 시 TwinCAT 화면 깜빡 등장 문제. 어제 서비스 6개를 Disabled로 차단했으나 부족. 진단 결과 `HKLM\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Run`에 **TcSysUI** 항목이 살아있어 트레이 UI 자동 시작.
- 처리: UAC 관리자 권한 → 레지스트리 백업 → TcSysUI 항목 삭제 → TcSysUI(PID 20680)/TcEventLogger 프로세스 종료
- 검증: TwinCAT 관련 프로세스 0개 확인
- 백업: `C:\Users\lenovo\TcSysUI_RunKey_backup_20260506_081936.txt`
- **학습 패턴**: Windows 서비스 차단만으로 부족 — 레지스트리 Run 키 + 시작 프로그램 폴더 + 예약 작업도 별도 점검 필요
- 다음 액션: 다음 부팅 시 깜빡임 사라짐 검증

## [2026-05-06 00:15] plan | 강사 양성 파일럿 6주 시범 계획서 — 옵션 2 표준 5일 코스
- 참조: [[uttec-edu]], [[영업전략]], [[3.5-Stage 패키지]], [[정부지원 교육사업 채널]], [[Stage 0 견적서]]
- 내용: 옵션 2 표준 5일 코스(40시간, Day 1~5 Track A→E)의 첫 시범 운영을 6주 후로 가설정. 시나리오 A(무료 + 잠재 고객 모집) 채택 — 한국기계·태명과학 직원 우선 + 위시캣 동료 보완. Track F 통합 결정: 시나리오 C 채택(13가이드 그대로, 14가이드 미포함, 시범 안정 후 2차 차수 통합). 본인 부담 표준 320만 (장소 150만 + Claude Pro 50만 + 식대 50만 + 영상장비 50만 + 자료 20만). Stage 1 (300만) 1건 수주 시 거의 본전. 풀 강의 영상 40h가 영구 영업 자산.
- 산출물: aiStudy/introductionAi/강사양성_파일럿/0_시범계획서.md (13 섹션) + README.md
- 핵심 결론: **검증·확장·영업 3차원 동시 확보**. 한국기계·태명과학에 시범 안내가 Stage 0 PDF 회신 시점에 묶이면 영업 + 시범 모집이 한 흐름. 정부지원 매트릭스(#12 톱 3 채널)의 실적 자료로도 직결.
- 다음 액션: (1) 한국기계·태명과학 시범 안내 메일 작성 (이번 주) (2) 위시캣 동료 1~2명 컨택 (3) 장소 후보 3곳 답사 (4) T-3주(05-26) 수강생 4명 확정 평가

## [2026-05-05 23:50] research | 정부지원 교육사업 매칭 조사 — 9 채널 1차 조사 + 톱 3 진입 전략
- 참조: [[영업전략]], [[uttec-edu]], [[On-Device AI]], [[K-문샷]], [[3.5-Stage 패키지]], [[n8n]]
- 내용: WebSearch 11회로 9개 정부 채널 자료 수집 후 종합 매트릭스 작성. 5차원(단가/자격충족/콘텐츠매칭/진입난이도/매출잠재) 25점 만점 평가. 톱 3 도출:
  - 1순위 서울시 정보통신교육 전문강사 (22/25): 자격 즉시 충족 + 보조강사 모집 활성. 시간당 5~10만 안정 매출.
  - 2순위 스마트제조혁신 공급기업 등록 (20/25): smart-factory.kr Pool + 통합 역량진단. 도입기업 매칭 시 1~5억/건 + 한국기계 견적 가산점.
  - 3순위 디지털배움터 + 혁신바우처 병행 (18~19/25): 시간당 5~8만 + 기업당 5,000만 잠재.
- 산출물: 영업/정부지원_교육사업/0_검토_노트.md (12 섹션) + README.md
- 핵심 결론: **9 채널 중 즉시 진입 가능 4건 — 이번 주 내 등록 시작 가능**. 6개월 누적 잠재 매출 6,000만~1억. uttec-edu 13가이드 + Track F 콘텐츠가 정부 채널과 매칭되어 영업 안정 채널 확보.
- 자동화 발견: 정부 공고 일일 모니터링이 위시캣 자동검색 패턴과 동일 구조 → n8n 워크플로우로 즉시 확장 가능 (bizinfo/smart-factory/nipa 크롤링 + 적합도 점수)
- 다음 액션: (1) 서울시 강사 보조 공고 확인·지원 (2) smart-factory.kr 공급기업 등록 (3) 디지털배움터 지역사업자 1~2곳 컨택 (4) 정부 공고 자동검색 n8n 워크플로우 구축

## [2026-05-05 23:10] update | 스마트팩토리 슈레더 제안서 — Hailo-8 옵션 추가 (옵션 A 노선)
- 참조: [[스마트팩토리]], [[On-Device AI]], [[영업전략]], [[양산제품]], [[3.5-Stage 패키지]]
- 내용: smartFactory/shredder/ 일반 템플릿 3건(메인 제안서·통합 제안서·상세 계획서)에 Hailo-8 옵션 B 추가. 한국기계 진행중 견적(15억 규모 3건)은 분리 보존. 옵션 A(Jetson Orin NX 100 TOPS @ 25W, 다목적) vs 옵션 B(Hailo-8 26 TOPS @ 2.5~3W, ★ perf/W 9~10 TOPS/W 세계 1위, 24/7 비전 검사 특화). 100라인 5년 누적 운영비 약 1억 원 절감 비교 표 포함. 영업 카피: "Jetson은 매시간 25W, Hailo-8은 3W — perf/W 세계 1위 5년 1억 절감". 하이브리드(본체 A + 비전 검사 보조 B) 권장 시나리오 명시.
- 산출물: smartFactory/shredder/Edge_AI_슈레더_제안서.md(11.1 갱신), Edge_AI_SmartFactory_통합제안서.md(10.1 갱신), 슈레더_AI시스템_구축_상세계획서.md(8.1 갱신)
- 핵심 결론: **본인 Hailo-8 보드 미보유 상태에서도 객관적 사양·운영비 비교 표만으로 영업 자료 차별화 즉시 확보**. 신규 잠재 고객 견적부터 적용. ESP32-S3 보드 입수(#34) 시 Hailo-8 보드도 함께 입수해 데모 제작 가능.
- 다음 액션: (1) Hailo-8 한국 정식 대리점·납기·단가 확인 (2) 본인 데모 제작 (Hailo-8 보드 + AI FanStick + ESP32-S3 일괄 입수) (3) 시범 고객 발송 시 Hailo-8 옵션 영업 카피 검증

## [2026-05-05 22:55] update | PC `/wishket-check` skill 정책 정비 — n8n과 동일 신호 체계 정렬
- 참조: [[n8n]], [[ai-direction]], [[영업전략]], [[위시캣활동]], [[On-Device AI]], [[uttec-edu]]
- 내용: PC `.claude/skills/wishket-check/SKILL.md`의 ❌ 불가 분야에 "AI/ML 모델 개발"이 명시되어 있어 n8n 자동검색 prompt(On-Device AI 가산점)와 **정반대 신호** 발생 — 2026-04-22 사업 전환(LED → AI 3대 사업) 이후 시점이 PC skill에 미반영. 정비:
  - ✅ 적합 분야를 4 카테고리로 재구성: A) 전통 임베디드(STM32/ESP32-S3/EtherCAT/CAN/RS485) B) AI 3대 사업(교육 + 스마트팩토리 + 소형제품) C) On-Device·Edge AI(Ollama/TinyML/NPU/Federated) D) AI 영역 추가(n8n/MCP/Vibe coding)
  - ❌ 불가에서 "AI/ML 모델 개발" 제거 → ⚠️ 검토 필요로 세분화 (클라우드 GPU 단독, LLM 파인튜닝 단독은 검토 필요)
  - 자매 시스템(~/n8n/wishket-prompt.txt) 명시, "동일 신호 체계" 보장 문구 추가
  - SKILL.md 변경 이력 섹션 신설 (2026-04-22, 2026-05-05)
- 산출물: .claude/skills/wishket-check/SKILL.md 갱신
- 핵심 결론: **n8n cron 자동평가와 PC 수동검토가 동일 신호 출력**. 두 시스템이 충돌 시 영업 판단이 흔들리므로 정합성 필수. 사업 전환 + On-Device AI 분석이 양쪽 모두에 반영됨.
- 다음 액션: (1) 다음 /wishket-check 실행 시 새 카테고리 동작 확인 (2) 1주 후 양쪽 시스템 결과 비교 (3) wishket-apply skill에도 사업 전환 반영 여부 점검

## [2026-05-05 22:35] update | 위시캣 자동검색 키워드 확장 — On-Device AI 가산점 시스템
- 참조: [[n8n]], [[ai-direction]], [[영업전략]], [[위시캣활동]], [[On-Device AI]]
- 내용: home-odroidc2:~/n8n/wishket-prompt.txt를 757 → 1873 chars로 확장. UTTEC 적합도 컨텍스트에 On-Device AI/TinyML/NPU/Federated Learning 전문성 추가 + "강한 적합 신호" 섹션 신설(키워드 매칭 시 +1~2점 가산, 상한 10). 매칭 키워드: 온디바이스, Edge AI, TinyML, NPU, Jetson/Hailo/Orin, SLM, Llama 3.2, Ollama, Federated Learning, 임베디드+AI 동시 언급, 휴머노이드, SDV, ASIL+ML 등. cron 매일 09:00 자동 적용. 백업: wishket-prompt.txt.bak.20260505_213241.
- 산출물: home-odroidc2:~/n8n/wishket-prompt.txt 갱신
- 핵심 결론: **오늘 작성한 aiOnDevice 후속 분석 3종(humanoid/sdv/federated)이 영업 자동화에 즉시 반영됨**. 분석 → 실행 시간 6시간 사이클. 다음 09:00 cron부터 On-Device AI 영역 위시캣 프로젝트가 자동 우선순위화.
- 다음 액션: (1) 내일 09:00 cron.log 확인 (2) 1주 후 가산점 효과 측정 (이전 vs 신규 키워드 매칭 비율) (3) 추가 키워드 후보(휴머노이드, SDV) 효과 검증 후 prompt 미세 조정

## [2026-05-05 22:25] automation | Stage 0 견적서 PDF 자동 발송 워크플로우 구축
- 참조: [[n8n]], [[Stage 0 견적서]], [[영업전략]], [[home-odroidc2]]
- 내용: Hybrid 아키텍처(PC = Chrome headless PDF + 한글 폰트 / n8n 서버 = SMTP 발송) 구축. PC `영업/quotes-test/generate_and_send.py`(Python 3.14)에서 Stage 0 견적서.md를 읽고 회사별 맞춤 정보(intro 1단락 + 산출물 3건) 치환 → markdown→HTML(CSS 인라인)→Chrome print-to-pdf→SFTP→SSH 트리거. 서버 `~/n8n/send_quote_attachment.py`(Python 3.12 표준 lib)에서 .secrets 로드 후 smtplib SMTP_SSL 465로 첨부 메일 발송. 한국기계(282KB) + 태명과학(283KB) 양쪽 ihong9059@gmail.com 수신 검증 완료. 사용자 Gmail 확인 결과 한글 폰트 정상.
- 산출물: 영업/quotes-test/generate_and_send.py, n8n/docs/deploy_send_quote_attachment.py, ~/n8n/send_quote_attachment.py, ~/n8n/quotes/(2 PDFs)
- 핵심 결론: **n8n 서버 ARM64에 sudo·pip·libpango·한글폰트 모두 부재 → 단독 PDF 비실용**. PC가 렌더링·서버가 발송하는 hybrid가 검증된 최적 패턴. 새 회사 추가 시 COMPANIES dict + python generate_and_send.py 회사명 1줄로 발송 가능. 영업 자동화 첫 영구 자산 확보.
- 다음 액션: (1) 실제 고객 담당자 이메일 확보 시 --to 옵션으로 발송 (2) n8n UI 워크플로우로 시각화 추가 (3) 1주 후 follow-up 메일 자동화 cron

## [2026-05-05 22:30] update | uttec-edu Track F (On-Device AI) 신설 — 14가이드 / 6 Track 확장
- 참조: [[uttec-edu]], [[On-Device AI]], [[3.5-Stage 패키지]], [[ai-direction]]
- 내용: aiStudy/introductionAi/14_On-Device_AI.md 신규 작성(10섹션 실습 중심): Ollama 노트북 SLM(Llama 3.2 3B, Continue VS Code 통합) + Apple MLX(Mac M-시리즈) + ESP32-S3 + TFLite Micro(TinyML) + UTTEC 적용 4건(노트북 SLM/Edge AI 스마트팩토리/AI FanStick/영업 카피) + 4주 학습 로드맵. 00_목차.md 갱신: 14번 행 추가, "5 Track → 6 Track", Track F 학습 의도 표, 다이어그램에 Track F 블록 추가. 변경 이력 기록.
- 산출물: aiStudy/introductionAi/14_On-Device_AI.md, 00_목차.md 갱신
- 핵심 결론: **3.5-Stage 패키지 Stage 1 교육 콘텐츠와 Stage 4 영업 자료(1,500만)가 직결**. Track F 영업 카피 "외부 LLM 의존 0% — 양산제품·공장·IP 보호용"이 K-문샷 미션 #10 인재양성 정부조달 응모 무기.
- 다음 액션: (1) 본인 노트북 Ollama 설치 + Llama 3.2 3B 시연(촬영) (2) Track F 영상 제작(5 Track 소개영상 v2 또는 별도) (3) ESP32-S3 보드 1개 입수 + hello_world 검증 → AI FanStick 다음 버전 결정(#34 진행중)

## [2026-05-05 21:50] ingest | AI On-Device 후속 분석 3종 — 휴머노이드 / 차량 SDV / Federated Learning
- 참조: [[ai-direction]], [[영업전략]], [[양산제품]], [[uttec-edu]], [[스마트팩토리]], [[외벽로봇]], [[ai-fanstick]], [[memory-mcp]]
- 내용: aiOnDevice/README.md 섹션 10 부록 "추가 조사 권장 영역"의 3개 주제를 별도 분석 문서로 작성. WebSearch 9회로 2026 5월 기준 최신 자료 수집.
  - **humanoid.md**: Tesla Optimus V3 Q3 2026 양산(연 100만 목표), Hyundai-Boston Dynamics Atlas Product CES 2026 공개(연 3만/2028), Figure 02 BMW Spartanburg PoC 완료, 1X NEO $20K 첫 소비자 출시. NVIDIA Jetson Thor 2070 TFLOPS / 128GB / Isaac GR00T N1.7 VLA 표준화. **휴머노이드 BOM 90%가 임베디드** → UTTEC 양산 38년이 모터 컨트롤러·BMS·IMU·안전회로 8/9 영역 즉시 매칭.
  - **sdv.md**: NVIDIA Drive Thor(Volvo EX90, Mercedes EQS, Jaguar/Land Rover 2026~) + Qualcomm Snapdragon Ride Flex(VW 2027, 75M+ 차량 누적). 100 ECU → 5 컴퓨트 + 4 zonal로 통합. **단, zonal 사이 IO 보드는 차량당 수십 개로 분산 → 새 Tier-2 시장**. UTTEC + STM32 + 외벽청소로봇 SIL2가 ASIL-B 보드(조명·HMI·도어)에 매칭. 인증 진입 장벽 높지만 수익 안정.
  - **federated-learning.md**: Apple Siri / Google Gboard production 5년+ 검증, NVIDIA FLARE 의료 양산 진입(2025~2026 의료영상 벤치마크 논문). Flower(학술/PoC) + FLARE(production). **한국 제조사 "노하우 외부 유출 공포" + 의료 보수적 데이터 정책에 정확히 매칭**. Memory MCP(Foundry 3층) + Federated Learning(Foundry 4층) 결합으로 3.5-Stage 패키지 완성도 ↑.
- 산출물: `aiOnDevice/humanoid.md`, `aiOnDevice/sdv.md`, `aiOnDevice/federated-learning.md` + README.md 섹션 10 갱신
- 핵심 결론: **3.5-Stage 패키지 → 7-Stage로 확장 가능성 도출**. Stage 4 On-Device(1,500만), Stage 5 휴머노이드 양산 컨설팅(5,000만~1억), Stage 6 SDV 부품 양산 컨설팅(1~3억), Stage 7 의료/금융 Federated 컨설팅(5,000만~1억). 기존 4,300만 → 잠재 1억+ 패키지로 격상 가능.
- 다음 액션: (1) 현대모비스/보스턴다이내믹스코리아 Atlas 부품 공급망 컨택 (2) 자동차 ASIL-B 인증 3년 로드맵 수립 (3) 스마트팩토리 견적서에 federated 옵션 추가 (4) AI FanStick 다음 버전 federated personalization 검토

## [2026-05-05 20:30] ingest | AI On-Device 종합 분석 — 현재 흐름 + 향후 전망 + UTTEC 적용 방안
- 참조: [[ai-direction]], [[영업전략]], [[양산제품]], [[uttec-edu]], [[스마트팩토리]], [[3.5-Stage 패키지]]
- 내용: 2025~2026년이 "클라우드 AI → 온디바이스 AI" 변곡점. SLM(1B~14B) + NPU(40~80 TOPS)가 새로운 표준. WebSearch 7회로 시장 동향(Edge AI $66B/2030, SLM 28.7% CAGR), 모델 계층(SmolLM2 135M ~ Llama 3.x 70B), 하드웨어 계층(MCU TFLite Micro ~ Jetson AGX Orin 275 TOPS), 프레임워크(MLX, llama.cpp, ExecuTorch, TFLite Micro 등 10종), 산업 사례(Humanoid HMND 01 Siemens 공장 / Heidi Remote 의료 STT / Hailo-15 산업 카메라 30fps), 1년·3년·5년 전망 종합. UTTEC의 임베디드 38년 + AI 통합 + 양산 5개 + Edge 인프라가 이 흐름 정중앙에 위치 — 3.5-Stage 패키지에 "Stage 4 On-Device AI 통합 (1,500만)" 신설 권장.
- 산출물: `aiOnDevice/README.md` (11섹션, 출처 22개 + UTTEC 적용 방안 4건)
- 핵심 결론: **"클라우드 AI는 매달 비용을 청구한다. UTTEC는 한 번 구축으로 평생 무료다"** — Phi-4 14B 노트북 1대 1만 쿼리/일 = 전기료 30,000원/월 vs GPT-5 API 5,000만원/월 = **1,400배 절감**. 이 카피가 영업 결정타.
- 다음 액션: (1) uttec-edu Track F 신설 검토 ("On-Device AI") (2) AI FanStick 다음 버전에 Llama 3.2 1B(650MB) 통합 검토 (3) 스마트팩토리 견적서에 Hailo-8 옵션 추가 (4) 위시캣 자동검색 키워드에 "온디바이스/edge/TinyML/NPU/Jetson" 추가

## [2026-05-05 19:05] update | 위시캣 #155004 전자칠판 기술지원 챗봇 앱 지원서 작성 — 자동검색 첫 수확
- 참조: [[위시캣활동]], [[uttec-edu]], [[experience]], [[양산제품]], [[회사소개]]
- 내용: 오늘 18:30 n8n 위시캣 자동검색이 첫 실행에서 발견한 #155004(score 8, 1,500만/60일)에 대해 /wishket-apply skill로 지원서 작성. 핵심 통찰은 두 제약("AI 사용 배제" + "기존 서버 활용 필수")을 약점이 아닌 강점으로 전환한 것 — 외부 LLM API 비용 0원 + 데이터 외부 유출 0 + 24/7 자체 호스팅 노하우와 정확히 매칭. 26명 지원 경쟁에서 차별화 핵심: (1) 파나소닉 LCD/I/O Printer Controller 경력으로 전자칠판 도메인 깊이 (2) Linux 서버 5대 + 12+ PM2 + 9개 도메인 24/7 운영 (3) 룰 기반 패턴 매칭 시스템(스마트팩토리 알람·Python Vibe) 다수 운영. 매칭률 8/8 (100%).
- 산출물: `위시캣/2026-05/155004_전자칠판챗봇/2026-05-05_프로젝트155004_지원내용.txt`
- 핵심 결론: **n8n 자동검색 → 발견 → AI 평가 → 지원서 작성까지 한 흐름이 6시간 내 완성** (18:30 발견 → 19:05 지원서). 본인 매일 30분 수동 검색이 자동화로 전환되어 시간 회수 + 경쟁 환경에서 즉시 응답 가능. 다음은 Notion DB 추가 + 클라이언트 답변 추적.
- 다음 액션: (1) Notion 위시캣 추적 DB에 #155004 행 추가 (대기 상태) (2) 위시캣 사이트에서 실제 지원 액션 (3) 클라이언트 답변 시 미팅 일정 협의

## [2026-05-05 18:48] automation | 위시캣 자동화 v2 — Notion + Gmail 통합, 매일 09:00 무인 실행 완성
- 참조: [[n8n]], [[home-odroidc2]], [[uttec-edu]], [[claude-code]], [[3.5-Stage 패키지]]
- 내용: v1(JSON 파일 저장)에 Notion + Gmail 통합 추가. 모듈 분리 설계(`notion_add.py` + `email_send.py` 헬퍼 + `wishket-check.sh` 메인 + `.secrets` chmod 600). Notion은 기존 PC notion-sync hook과 동일한 PAGE_ID 사용 → "진행" 섹션 to_do 블록 추가 → 다음 /work-start 시 작업보고서 자동 동기화. Gmail SMTP_SSL + App Password 인증. 검증: 오늘자 JSON 재처리로 Notion 2/2 추가 + Gmail 발송 성공. 내일 09:00부터 사람 개입 0%로 매일 자동 실행.
- 산출물:
  - `~/n8n/.secrets` (chmod 600) — NOTION_TOKEN + NOTION_PAGE_ID + GMAIL_USER + GMAIL_APP_PASSWORD + EMAIL_TO
  - `~/n8n/notion_add.py` (chmod 755) — JSON stdin → Notion 페이지 to_do 블록 PATCH
  - `~/n8n/email_send.py` (chmod 755) — JSON stdin → Gmail SMTP_SSL 465 발송
  - `~/n8n/wishket-check.sh` v2 — secrets source + claude + Notion + Email + (옵션) Webhook
- 보안: .secrets 파일은 ODROID-C2에만 존재(2대 PC 환경 + git 제외 보호), 토큰 파일 로컬 미저장
- 핵심 결론: **3.5-Stage 패키지 Stage 0 산출물 #4(n8n 자체 호스팅) + Phase 1 본인 자동화 트랙(매일 30분 절약 + 자동 알림 Push) 동시 검증 완료.** 다음 영업 미팅에서 "이 자동화를 귀사에 구축합니다" 살아있는 데모 가능.
- 다음 액션: (1) 내일 09:00 첫 자동 실행 검증 (2) #155004 즉시 검토 (3) n8n UI 시각화 워크플로우 (영업 데모용) (4) last_id 추적으로 신규만 평가 최적화

## [2026-05-05 18:30] automation | 위시캣 자동 검색 1차 완성 — 첫 실행 즉시 #155004 전자칠판 챗봇 발견(score 8)
- 참조: [[n8n]], [[home-odroidc2]], [[3.5-Stage 패키지]], [[uttec-edu]], [[claude-code]]
- 내용: 호스트(odroidc2)의 Claude Code 2.1.112 + 이미 설정된 claudeAiOauth 인증 활용. 인라인 이력서 컨텍스트(임베디드 38년 / AI 통합 / 한일 인증 / 단가 시간 5~10만 / 단기 PoC 선호 / 대규모 SI·상주 비선호)를 프롬프트에 포함하여 매일 09:00 cron으로 위시캣 신규 8건 평가 + JSON 저장. n8n 컨테이너에서 직접 claude를 호출하지 않고 호스트 cron + wrapper 스크립트 + 옵션 N8N_WEBHOOK_URL POST 패턴 채택(컨테이너 내부 claude 의존성 우회 + 모듈성 확보).
- 산출물: ~/n8n/wishket-prompt.txt + ~/n8n/wishket-check.sh + /etc/cron.d/n8n-wishket + ~/n8n/data/wishket/YYYY-MM-DD.json
- 첫 실행 결과 (43s, 8 projects, 2 high-fit):
  - ⭐ **#155004 전자칠판 챗봇 앱** (score 8, 1,500만/60일) — AI+임베디드+교육 3박자 매칭 — 본인 검토 필수
  - #154717 Python/React 특허 자동화 (score 7) — 한일 특허 도메인 매칭
  - #155037 상품권 자동 매입 (score 3) — 어제 본인 부적합 판단과 일치 → 평가 신뢰성 입증
- 핵심 결론: **본인이 매일 30분 수동으로 하던 검색을 43초/0개입 자동화로 전환** + 첫 실행에서 즉시 검토 가치 있는 신규 1건 발견. 이로써 3.5-Stage 패키지 Stage 0 견적서의 산출물 #4(n8n 자체 호스팅) + Phase 1 본인 자동화 트랙(영업 무기 패키징 전제) 동시 검증.
- 다음 액션: (1) #155004 즉시 검토 → 지원 여부 결정 (2) n8n Webhook 통합 (시각화 + Slack 발송) (3) last_id.txt 상태 추적으로 신규만 평가 최적화 (4) 결과 캡처 → Stage 0 견적서 부록 추가

## [2026-05-05 17:25] init | n8n 설치 완료 — home-odroidc2 (Tailscale 100.89.56.69) Docker 기동 성공
- 참조: [[n8n]], [[home-odroidc2]], [[3.5-Stage 패키지]], [[Stage 0 견적서]], [[Pipeline_Builder_적용_검토]]
- 내용: 사전점검(paramiko 자동) → Docker 29.4.2 설치(171s) → n8n 2.18.7 기동 → HTTP 200 검증 4단계 자동화. **설치 대상 변경**: 원래 README는 revita 서버(100.73.114.75)를 가정했으나 사전점검에서 home-odroidc2가 실제 활성 서버로 확인되어 그쪽으로 진행. ARM64/RAM 2GB/디스크 7GB 제약 대응을 위해 NODE_OPTIONS=--max-old-space-size=768 + memory cap 1GiB + DB SQLite 기본 + EXECUTIONS_DATA_PRUNE 7일 설정.
- 이슈/해결: `sudo cd ~/n8n && docker compose ...` 실패 → `sudo bash -c '...'` + `docker compose -f` 절대경로로 우회.
- 산출물:
  - 원격 `~/n8n/` (.env chmod 600 + docker-compose.yml + data/ + backups/)
  - 로컬 `n8n/credentials/n8n_basic_auth.txt` (gitignored — URL/User/Password)
  - 로컬 `n8n/docs/installation_log.md` (시간순 4단계 기록)
  - 로컬 `n8n/docs/precheck.py / install_docker.py / install_n8n.py / start_n8n.py / verify_n8n.py` (재현 가능 자동화 스크립트)
- 검증: localhost:5678 HTTP 200 + 100.89.56.69:5678 Tailscale 외부 HTTP 200 + Basic Auth 정상 + 메모리 283 MiB/1 GiB (27.7%) + CPU idle 0.22%
- 핵심 결론: **3.5-Stage 패키지의 Stage 0 산출물 #4(n8n 자체 호스팅) 실 환경 확보**. 이제 Stage 0 견적서를 시범 고객에 발송 시 화면 캡처/실시간 데모 가능. 다음은 Owner 계정 생성 + Hello World + 위시캣 자동 검색 워크플로우.
- 다음 액션: (1) Chrome으로 http://100.89.56.69:5678 접속 + Owner 계정 생성 (2) Hello World (3) 위시캣 자동 검색 (Schedule + Claude API + Notion + Slack) (4) 백업 cron `~/n8n/backup.sh` + crontab 03:00

## [2026-05-05] ingest | n8n/ 폴더 신설 — Docker 설치 사전 준비 (왜·무엇·어떻게 통합 README)
- 참조: [[n8n]], [[revita 서버]], [[3.5-Stage 패키지]], [[Stage 0 견적서]], [[Pipeline_Builder_적용_검토]]
- 내용: revita 서버에 n8n Docker 설치 진행 전 사전 준비. top-level `n8n/` 폴더에 README.md 신설(8섹션 1만+자) + 하위 디렉토리(workflows/docs/customer-demos/credentials) + .gitignore. README는 (1) 왜 지금 설치하는가 4가지(영업 차별화 / Stage 0 견적서 약속 / 본인 자동화 ROI / Foundry 1·2층 자체 구현 증명) (2) n8n 30초 요약 (3) revita 서버 선택 근거 (4) Docker 설치 8단계(사전점검→Docker설치→.env→docker-compose.yml→기동→접속→Hello World→백업 cron) (5) 첫 워크플로우(위시캣 자동검색) (6) 보안·운영 체크리스트 + 트러블슈팅 표 (7) Day 1~Week 3 액션 (8) 핵심 인사이트.
- 산출물:
  - `n8n/README.md` (왜 + Docker 설치 가이드)
  - `n8n/.gitignore` (credentials/.env, data/, backups/ 제외)
  - `n8n/docs/installation_log.md` (시간순 운영 로그 시작)
  - `n8n/credentials/README.md` (자격증명 보관 규칙)
  - `n8n/workflows/`, `n8n/customer-demos/` (빈 폴더, 향후 .json export)
- 핵심 결론: **기존 `n8n_실행_가이드.md`(영업 전략) + 신설 `n8n/README.md`(설치·운영) 분리 — 각각 다른 목적**. revita 실제 설치는 다음 세션 또는 SSH 접속 가능 시점에 `installation_log.md`에 시간순 기록하며 진행.
- 다음 액션: (1) revita SSH 접속 + Docker 사전점검 (2) ~/n8n/.env + docker-compose.yml 작성 (3) 기동 + Hello World (4) 위시캣 자동검색 워크플로우

## [2026-05-05] ingest | Stage 0 Core Services Starter Pack 견적서 1페이지 — 영업 무기화 첫 산출물
- 참조: [[3.5-Stage 패키지]], [[영업전략]], [[Core_Services_무료대체_매핑]], [[스마트팩토리]]
- 내용: 어제 도출한 Stage 0(500만) 패키지의 영업 즉시 활용 가능한 1페이지 견적서 작성. 핵심 카피 "Foundry 1층을 1주에 500만"을 진입 메시지로, Foundry Core Services 7종(IAM/Storage/Security/Audit/Catalog/API Gateway/Collaboration) → Free Tools 대체 매핑 표를 가격 정당성으로, 산출물 6종(Tailscale 메시 + Git 표준 저장소 + Obsidian Vault + n8n 도커 + Slack 알림 + 운영 매뉴얼/영상 강의)을 가시성으로 구성. 5영업일 일정표 + Stage 1~3 옵션 미포함 명시 + 차별화 메시지("만족 시 단계 확장, 아니면 1주 후 인계") 포함.
- 산출물: `영업/Stage0_Core_Services_견적서.md` (550만/VAT 포함)
- 핵심 결론: **3.5-Stage 패키지 첫 영업 자료 완성** — 결재권 1,000만 이하 부장급도 결재 가능한 진입 가격으로 설정. 다음 단계는 태명과학 또는 한국기계에 시범 발송, 또는 신규 위시캣 발주사 매칭 시 즉시 회신 자료로 활용.
- 다음 액션: (1) Memory MCP에 견적서 entity 추가 (2) Canvas 시각화 시 견적서를 Stage 0 노드로 배치 (3) 시범 고객 1곳 선정 후 PDF 변환 + 발송

## [2026-05-05] verify | Memory MCP 영구 저장 검증 — Claude Code 재시작 후 read_graph 정상 로드
- 참조: [[Memory MCP]], [[claude-code]]
- 내용: 어제 영구 저장 이슈 해결(.claude.json env 블록 수정 + memory.json 시드 배치) 후 첫 Claude Code 재시작. `mcp__memory__read_graph` 호출하여 시드 12 entities + 20 relations 모두 자동 로드 확인. UTTEC, 홍광선, 3.5-Stage 패키지, 스마트팩토리, uttec-edu, 한국기계, 태명과학, n8n, revita 서버, Memory MCP, Obsidian myWiki, Foundry 5층 아키텍처 — 모두 observation 본문까지 보존됨.
- 핵심 결론: **MCP 서버 영구 저장 패턴 확립** — `.claude.json` mcpServers.<name>.env 블록에 환경변수 직접 명시 + 데이터 파일을 절대경로로 지정. 향후 다른 MCP(예: Filesystem, Obsidian) 도입 시 동일 패턴 적용.

## [2026-05-05] ingest | K-문샷 (한국 정부 거대 R&D) 엔티티 신설 — 영업전략 정부지원 연계 핵심 추가
- 참조: [[k-문샷]], [[영업전략]], [[uttec-edu]], [[스마트팩토리]], [[ai-direction]]
- 내용: 2026-03-11 출범한 한국 K-Moonshot R&D 프로그램을 entity로 정리. 거버넌스(MSIT 배경훈 부총리, 161개 기업), 예산(2026 AI 10.1조, +206% YoY, R&D/GDP 5.2% 세계 2위), 12대 국가미션(2035 목표), AI Co-Scientist 6대 분야(2027~31, 4,640억) 종합. UTTEC 직접 응모는 비현실적이지만 간접 진입 경로 5종 도출(하위 발주 / AI Co-Scientist 도입 컨설팅 / 휴머노이드 양산 인프라 / AI 가속기 검증 / 인재양성 정부조달).
- 산출물:
  - `myWiki/second-brain/entities/k-문샷.md` (entity 신설)
  - `문샷/` 폴더 신설 + `UTTEC_액션플랜.md` (간접 진입 5경로 상세 + 즉시 액션 4건)
- 핵심 결론: **인재양성 미션 #10 (2만 명 AI 전문가)이 uttec-edu 13가이드·5 Track 영상과 직접 매칭**. AI Co-Scientist 출시(2027~) 대비 영업 메시지 사전 준비 — "K-문샷이 만든 AI를 1/100 가격에 도입시켜드립니다"는 3.5-Stage 패키지와 정확히 맞물림.
- 다음 액션: NTIS 회원가입 + K-문샷 키워드 알림 / 미션 #10 정부조달 응모 가능성 조사 / 휴머노이드 양산 발주처 조사

## [2026-05-05] init | Memory MCP 첫 활용 — 시드 지식 그래프 12 entities + 20 relations 구축
- 참조: [[Memory MCP]], [[3.5-Stage 패키지]], [[Foundry 5층 아키텍처]], [[claude-code]], [[스마트팩토리]]
- 내용: 어제(05-05 오후) 설치한 Memory MCP를 실제 사용. 12개 핵심 비즈니스 엔티티를 시드로 생성(UTTEC, 홍광선, 3.5-Stage 패키지, 스마트팩토리, uttec-edu, 한국기계, 태명과학, n8n, revita 서버, Memory MCP, Obsidian myWiki, Foundry 5층 아키텍처) + 관계 20건(운영한다/사업라인이다/도구로포함한다/고객후보다/Stage1_2시범견적후보다 등). read_graph·create_entities·create_relations·open_nodes·search_nodes 모두 정상 동작 확인.
- 주요 발견:
  1. **search_nodes 패턴**: 단일 키워드는 정상, 다중 단어는 AND 매칭 (모든 단어 포함 필요). 한글 entityType("고객후보")로 검색 시 빈 결과 — 영문 entityType("customer-prospect") 일관 사용 권장 또는 observation 본문에 한글 키워드 포함.
  2. **영구 저장 이슈 발견·해결**: `.claude.json` MCP env 블록이 `{}`로 비어있어 MEMORY_FILE_PATH가 서버에 전달되지 않음. 데이터가 메모리에만 있고 디스크 미저장 상태였음. 수정 후 `C:\todo\today\myWiki\ontology\memory.json`에 시드 JSONL 12+20행 직접 배치 → 다음 Claude Code 재시작 시 자동 로드됨.
- 산출물:
  - `myWiki/ontology/memory.json` (시드 파일, JSONL 형식)
  - `myWiki/ontology/memory_seed_2026-05-05.jsonl` (백업)
  - `~/.claude.json` (env 블록 수정: MEMORY_FILE_PATH 추가)
  - `~/.claude/projects/C--todo-today/memory/reference_memory_mcp.md` (검증 결과 + 검색 노하우 갱신)
- 핵심 결론: **Memory MCP가 영업 컨텍스트의 "AI용 백본"** 역할 가능성 입증 — Obsidian이 사람용 1차 저장소면, Memory MCP는 AI가 즉시 쿼리 가능한 구조화 그래프. 다음 단계는 **위시캣 신규 검토 결과를 entities로 자동 누적**하는 워크플로우 구축(n8n 첫 워크플로우와 결합 가능).
- 다음 액션: (1) Claude Code 재시작 후 read_graph로 시드 12 entities 로드 확인 (2) 위시캣 #155041~#155060 검토 시 발주사를 customer-prospect entity로 자동 추가 (3) entities/.md frontmatter `links:` 필드를 Memory MCP relations로 일괄 마이그레이션 검토

## [2026-05-05] thought | Pipeline Builder 적용 검토 — 직접 구현 ❌, n8n + Obsidian + Claude로 같은 가치 1/100 비용
- 참조: [[스마트팩토리]], [[ai-direction]], [[영업전략]], [[claude-code]]
- 내용: 팔란티어 파운드리 #2 학습의 자연스러운 후속 질문 — Pipeline Builder를 우리가 구현할 수 있나? 3가지 야망 수준에서 평가. (1) 1:1 클론은 수십억 달러·20년·수천 엔지니어 규모로 불가능. (2) Lite 자체구현은 4~8주로 가능하지만 동일 도구 5개+ 무료 존재로 Not Invented Here 함정. (3) 철학을 본인 도구 스택에 적용은 이미 80% 완료 — 빠진 건 시각 UI 한 가지뿐. 시각 UI는 직접 만들지 말고 n8n(오픈소스, 노드 400+, AI 노드 포함, Self-host) 활용 권장.
- 산출물: smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md (8섹션, frontmatter 포함)
- 핵심 결론: **Pipeline Builder를 만드는 게 아니라, Pipeline Builder가 풀려는 문제(사일로 해체 + 비코더 협업 + AI 통합)를 우리 도구 스택(n8n + Obsidian + Claude)으로 1/100 비용에 해결하는 컨설팅** — 이게 영업 무기.
- 사업 적용: 3-Stage 패키지에 n8n 시각 워크플로우 구축 추가 → Stage 2 가격 1,500만 → **2,500만** (가치 1.7배). 총 4,300만 → **5,300만**. n8n 추가 가치 = 비코더 인계 후 자립 + 의사결정자에게 시각 설명 + 자체 호스팅으로 대기업 보안 대응. 첫 시범 견적: 태명과학 또는 한국기계에 Stage 1+2 통합 ~2,800만.
- 다음 액션: n8n 환경 구축(revita 서버) → 태명과학 데이터로 워크플로우 1개 → 5분 데모 영상(Remotion + n8n 캡처) → 견적서 항목 추가

## [2026-05-05] ingest | AI 도구 13종 5 Track 소개 영상 제작 완료 — Remotion + edge-tts 9씬, 5분 53초
- 참조: [[aiStudy]], [[remotion-project]], [[uttec-edu]], [[claude-code]]
- 내용: 어제 작성한 시나리오_AI교육_소개동영상.md를 Remotion 코드로 구현. edge-tts(ko-KR-InJoonNeural 남성 차분한 톤)로 9개 씬 내레이션 mp3 생성, 실제 오디오 길이 측정 후 씬 duration 정확히 매핑. 9 Scene 컴포넌트 작성 — Hook(문제 제기) → 5 Track 솔루션 → Track A 즉시 효용 3종 → Track B Claude 확장 → Track C 인프라 → Track D 협업 → Track E 콘텐츠/클라우드 → Before/After 사례 → CTA. 5 Track 컬러 시스템(보라/초록/파랑/분홍/청록), 13 도구 ToolBadge 재사용 컴포넌트, 씬별 데모(터미널·Obsidian Graph·VS Code·MCP 방사형·Tailscale 메시·Slack 알림·Before/After).
- 산출물:
  - remotion-project/src/AIToolsIntroVideo.tsx (9 Scene 컴포넌트, 1500+ 줄)
  - remotion-project/src/Root.tsx (Composition 등록)
  - remotion-project/scripts/intro-tools-video/ (9 .txt + generate-tts.py + measure-audio.py)
  - remotion-project/public/audio/intro-tools/ (9 mp3 파일)
  - remotion-project/out/AIToolsIntro/AI도구_5Track_소개영상.mp4 (63.5 MB, 1920×1080, 30fps)
- 특이사항: 시나리오 7분(420초) 계획 → 실제 5분 53초(353초)로 자연스러운 페이스. UTTEC-Lab 로고 좌측 상단 항상 표시. 영상 자체에 "이 영상도 Remotion으로 제작" 메타 강조 포함. 3-Stage 패키지 Stage 1 교육 자료의 핵심 무기 확보 — 영업 미팅·정부지원 입찰·온보딩 모두 활용 가능.

## [2026-05-04] ingest | AI 교육 패키지 마무리 — 13가이드 옵션 B 재편성 + 동영상 시나리오 + 강사용 마스터 가이드
- 참조: [[uttec-edu]], [[aiStudy]], [[claude-code]], [[remotion-project]]
- 내용: aiStudy/introductionAi의 13개 가이드를 학습 곡선 우선(옵션 B) 순서로 재편성. 5 Track 재정의(A: Claude+Obsidian+VSCode 즉시 효용 / B: Skill+MCP / C: GitHub+SSH+Tailscale / D: Slack / E: Colab+NotebookLM+Remotion+AWS). git mv로 12개 파일 rename, 00_목차·HTML Deep Dive 13카드·CTA·Track 섹션·각 가이드 "다음 단계" 링크 모두 일관되게 갱신.
- 산출물:
  - 시나리오_AI교육_소개동영상.md — 7분 영상 9씬 시나리오 (Remotion 제작용, TTS·BGM·자막 가이드 포함)
  - 교육_전체_설명서.md — 강사용 마스터 가이드 (3·5·7일 옵션, 13개 모듈 상세, 검증 체크리스트, 트러블슈팅, FAQ)
- 핵심 결론: **단일 도구(Obsidian+Claude) 체제를 유지하면서 교육 콘텐츠 일관성 확보**. 본 자료가 보완의견의 "Stage 1 AI 도구 교육"(3-Stage 패키지의 첫 단계)의 실행 자료가 됨. 정부지원 교육·기업 사내 교육·1인 사업자 학습용으로 즉시 활용 가능.
- 사업 적용: 태명과학·한국기계 등 기존 simulation 4개 wiki에 본 교육 패키지를 결합하면 4,000-5,000만원/건의 통합 패키지 영업 가능

## [2026-05-04] thought | 보완의견 — 교육 사업화 + web 앱 액션 점진추가로 약점이 강점이 됨
- 참조: [[스마트팩토리]], [[ai-direction]], [[uttec-edu]], [[aiStudy]]
- 내용: 오전 작성한 도구 적합성 검토(Obsidian+Claude 약점 진단)를 본인이 보완·반박. UTTEC이 이미 보유한 자산(AI_도구_가이드.html 60KB + demo_live.html 4종)을 사업 모델에 통합하면 약점이 강점으로 전환됨. (1) "고객사 인계 부적합" → 교육 사업화로 학습 곡선 자체가 매출이 됨, (2) "액션 불가능" → demo_live.html에 액션 Lv1~4 점진 추가
- 산출물: smartFactory/업무효율화/참고/Obsidian_Claude_적합성_보완의견.md
- 핵심 결론: **3-Stage 패키지(교육→위키 공동구축→web앱+액션) = 4,000-5,000만원/건**. 단일 도구 체제 유지 + 다층 가치 추가. 어제 권한 도구 전환(Obsidian→ChatGPT GPT→RAG)은 1인/소규모 또는 대기업에만 적용. 5인+ 중소기업 고객은 본 패키지가 우월.
- 사업 적용: 태명과학 또는 한국기계 1개사에 시범 견적 제안. AI_도구_가이드.html 3일 커리큘럼화. wiki→web앱 자동 빌드 스크립트 PoC가 핵심 차별점

## [2026-05-04] thought | 도구 적합성 검토 — Obsidian+Claude는 큐레이션 도구이지 배포 도구가 아님
- 참조: [[스마트팩토리]], [[ai-direction]], [[claude-code]]
- 내용: 어제 도출한 "위키 구조 = 목적·사용자·데이터의 함수" 원칙의 자연스러운 후속 질문 — 만약 simulation wiki가 myWiki와 본질적으로 다른 구조라면, Obsidian+Claude 조합 자체가 중소기업 업무효율화에 최선인가? 8개 대안 도구(Notion AI, ChatGPT GPT, Claude Projects, Copilot Studio, Dify, RAG 직접구축, Palantir Foundry) 비교 후 4단계 로드맵 제시.
- 산출물: smartFactory/업무효율화/참고/Obsidian_Claude_적합성_검토.md
- 핵심 결론: **Obsidian+Claude는 '제작 도구'이지 '배포 도구'가 아님**. 단계별 도구 분업이 정답 — (1)큐레이션 단계: Obsidian (현재 최선) → (2)시연 단계: 동일 → (3)고객 인계 단계: ChatGPT GPT/Notion → (4)운영 앱 단계: RAG/Dify로 진화. 마크다운 자산은 모든 다음 도구의 출발점이 되므로 락인 없음.
- 사업 적용: Phase 2(3-6개월)에 태명과학 Vault를 ChatGPT GPT로 1차 변환 + 1개 고객사 시범 운영 → Phase 3(6-12개월)에 RAG 운영 앱화 + 유료 구축 사업 (1건당 500-1,500만원)

## [2026-05-04] lint | 첫 정원사 사이클 실행 — Karpathy LLM Wiki 패턴 적용 완료
- 참조: [[skills]], [[claude-code]]
- 내용: myWiki second-brain에 Karpathy LLM Wiki "정원사 사이클" 패턴 도입. wiki-lint skill 신규 작성, wiki-query skill 신규 작성, work-end skill에 자동 lint 통합 (5-C 섹션). 첫 lint 실행에서 23건 이슈 발견 → 자동 fix 스크립트로 21개 entities/thoughts 파일에 frontmatter `links:` 필드 자동 추가. lint script에 index/log/dashboard 메타 페이지 예외 처리 추가. 최종 0 이슈 상태 달성.
- 산출물: .claude/skills/wiki-lint/SKILL.md, .claude/skills/wiki-query/SKILL.md, myWiki/second-brain/.lint-script.ps1, .lint-fix.ps1, work-end SKILL.md 5-C 섹션
- 특이사항: 정원사 사이클이 매 work-end마다 자동 실행되어 위키 건강 상태가 지속적으로 유지됨. 향후 STALE 임계값(30일) 조정 가능. wiki-query는 Grep 기반이지만 향후 그래프 탐색 강화 여지 있음

## [2026-05-04] ingest | 팔란티어 파운드리 시리즈 #3 학습 — Ontology Manager + Action 개념 + 4단계 End-to-End
- 참조: [[스마트팩토리]], [[ai-landscape]], [[ai-direction]]
- 내용: Kelly Ontology Hub 채널 #온톨로지매니저 #End-to-End #workshop 영상 학습 (시리즈 #3 자리). 오피스굿즈+뷰로SAS M&A 시나리오로 파운드리 4단계(수집→통합→온톨로지→운영앱)를 압축 시연. 핵심 통찰: **분석 툴 vs 운영 앱의 결정적 차이는 '액션(동사)' 개념**. 객체(명사)+액션(동사)=클릭 한 번으로 디지털 세상 변경.
- 산출물: 유투브/04_AI_이론/팔란티어_파운드리_3_OntologyManager_End-to-End_상세.md, #0/#1/#2 파일 시리즈 링크 갱신, 스마트팩토리.md "팔란티어 학습 5가지 적용 인사이트" 섹션 신설
- 특이사항: 시리즈 #3 명시 영상은 채널 미공개 → 가장 직접적인 후속작(qCn5aCLA9TY) 사용. "진짜_최종_V3 끝" 비유는 온톨로지 가치 마케팅 카피로 즉시 재사용 가능. 우리 디지털 트윈/스마트팩토리 영업 자료에 5가지 개념 직접 활용 가능

## [2026-05-04] thought | 위키 아키텍처 판단 원칙 도출 — 자기 이해형 vs 도메인 룩업형
- 참조: [[claude-code]], [[skills]], [[projects]], [[스마트팩토리]]
- 내용: simulation 예제(태명과학/한국기계)가 Karpathy LLM Wiki 패턴을 따르지 않는 이유 분석. 두 위키의 목적·사용자·데이터 성격이 본질적으로 다르며, Karpathy 패턴(Raw/Wiki/Schema + log + thoughts + identity)을 강제 적용하면 죽은 파일·중복 보관·환각 위험 발생.
- 산출물: 작업보고서/checkFile/simulation_구조차이_이유.md
- 판단 원칙: **위키 구조는 목적·사용자·데이터 성격의 함수다.** 자기 이해형 위키(개인 second brain) → Karpathy 패턴, 도메인 룩업형 위키(고객사 컨설팅 봇) → 도메인 카테고리 + 호환 매트릭스 + Dataview. simulation의 CLAUDE.md는 "스키마"가 아니라 "AI 페르소나 정의서" 역할.
- 특이사항: 향후 새 도메인 위키 제작 시 참고 가이드. simulation 제작 경험·인사이트는 second-brain의 thoughts/, projects.md에 ingest 되어야 두 위키가 분리되면서도 연결됨.

## [2026-05-04] ingest | LLM Wiki 패턴 학습 + 유투브 자료 카테고리 정리
- 참조: [[claude-code]], [[skills]], [[ai-landscape]]
- 내용: Andrej Karpathy의 LLM Wiki 패턴(Raw/Wiki/Schema + Ingest/Query/Lint) 영상 2편 + gist 원본 학습. 유투브 폴더 11개 파일을 4개 카테고리(LLM위키_지식관리/클로드_활용/AI_영상제작/AI_이론)로 분류. /yt-summary skill을 상세본 전용으로 단순화. 5개 영상 상세본 신규 생성 + Karpathy gist 한글 번역
- 산출물: 유투브/01~04 폴더 구조, 5개 상세본 md, llm-wiki-ko.md, .claude/skills/yt-summary/SKILL.md 단순화
- 특이사항: LLM Wiki의 "정원사 비유"가 myWiki second-brain의 lint/ingest 사이클과 정확히 일치 — 향후 second-brain에도 동일 패턴 적용 검토

## [2026-05-04] ingest | 팔란티어 파운드리 아키텍처 시리즈 학습 (#0/#1/#2)
- 참조: [[ai-landscape]], [[스마트팩토리]], [[ai-direction]]
- 내용: Kelly Ontology Hub 채널 팔란티어 파운드리 시리즈 3편 학습. 5층 아키텍처(Core→Data Connection→Ontology→Analysis→Application), Closed Feedback Loop, Hyperauto(SAP 통합 2개월→8시간), Writeback(양방향), Pipeline Builder(코더+비코더 협업 + AI 통합 + 온톨로지 직접 연결)
- 산출물: 유투브/04_AI_이론/팔란티어_파운드리_*.md (3편)
- 특이사항: 스마트팩토리 사업 영역에 직접 연결 — 온톨로지 + 디지털 트윈 + Operational Feedback Loop 개념을 자체 제안서/교육에 활용 가능. 다음 편(#3) Ontology Manager 예정

## [2026-05-03] ingest | AI 업무효율화 base tool 교육 가이드 13종 + 통합 HTML 제작
- 참조: [[aiStudy]], [[claude-code]], [[skill-자동화]], [[tailscale네트워크]]
- 내용: 초보자 대상 AI 도구 설치/사용 가이드 13종(MD) + 통합 HTML. 5 Track 체계(AI환경/인프라/콘텐츠/개발환경/팀협업). 기존 AI_도구_활용_가이드.md + myWiki 분석하여 누락 도구(Obsidian, Tailscale, VS Code, Slack) 식별 후 추가
- 산출물: aiStudy/introductionAi/ 01~13 MD + AI_도구_가이드.html + 00_목차.md
- 특이사항: 도구 간 상호 연결 관계를 아키텍처 맵 + 시나리오 7개로 시각화

## [2026-05-03] ingest | AI 공장자동화 교육자료 8종 제작 (8일 커리큘럼 + 포트맵 + LoRa + 동영상)
- 참조: [[aiHardStudy]], [[스마트팩토리]], [[uttec-edu]]
- 내용: RPi 3B+ + UTTEC Shield 기반 8일(32시간) 교육 커리큘럼, 보드 포트맵(port_map.py), E22-900T30D LoRa 매뉴얼 확보, TX/RX 크로스 연결 분석, 구현가능 기능 10개 카테고리 정리, 동영상 시나리오(5분30초 8씬) + 내레이션 대사 + 슬라이드용 설명자료
- 산출물: 교육자료/8일_교육커리큘럼.md, port_map.py, 구현가능_기능목록.md, 동영상_시나리오.md, 동영상_대사.md, 커리큘럼_설명자료.md, E22-900T30D_Manual.pdf
- 특이사항: RPi 3B+ UART/Bluetooth 충돌 이슈 문서화 (dtoverlay=miniuart-bt 필수)

## [2026-05-03] ingest | UTTEC 사업분야 종합 정리
- 참조: [[영업전략]], [[goals]], [[projects]], [[ai-direction]], [[strengths]]
- 내용: myWiki 전체(me, goals, projects, 영업전략, ai-direction, strengths, gaps, 위시캣활동, 스마트팩토리) 분석하여 UTTEC 사업분야 종합 문서 작성. AI 3대 사업(교육/스마트팩토리/제품) + 프리랜서 캐시카우, 정부지원 연계, 채널별 전략, 우선순위 액션 포함
- 산출물: 영업/UTTEC_사업분야_종합.md

## [2026-05-03] ingest | TwinCAT 서비스 비활성화 + 위시캣 검토
- 참조: [[projects]], [[위시캣활동]]
- 내용: Beckhoff TwinCAT 서비스 6개 Disabled 처리 + 관리 문서 작성. 위시캣 #154982~#155023 검토 (공개 7건 중 적합 0, 검토필요 1건 #154940 밸브/엑츄에이터)
- 산출물: twinCat/TwinCAT_서비스_관리.md, disable_twincat.ps1, 위시캣/2026-05/가능프로젝트/2026-05-03_가능프로젝트.md

## [2026-05-01] ingest | 약국+한의원 Wiki+데모 구축
- 참조: [[projects]], [[스마트팩토리]]
- 내용: 약국 Wiki 29파일(의약품DB/상호작용/DUR/보험) + 한의원 Wiki 24파일(처방/약재/경혈/체질/변증) + 각 전과정 설명서 + demo 웹 4종. 태명과학/한국기계 DB 테이블 엑셀 생성
- 산출물: 업무효율화/약국/(31파일), 업무효율화/한의원/(27파일), 태명과학/db/(7파일), 한국기계/db/(10파일)

## [2026-05-01] ingest | 업무효율화 데모 웹 제작 (태명과학 + 한국기계)
- 참조: [[projects]], [[스마트팩토리]]
- 내용: 태명과학(FRITSCH 장비) 데모 웹 2종 + 한국기계(분쇄장비) 데모 웹 2종 제작. 고정결과 버전 + 실시간 로직 버전. 한국기계 조달/외주 Wiki 데이터(BOM, 구매품, 외주가공, 간트차트) 추가
- 산출물: 태명과학/demo.html, demo_live.html, 한국기계/demo.html, demo_live.html, 조달/ 폴더

## [2026-05-01] ingest | 출석체크 인증 시스템 구축
- 참조: [[projects]], [[aiHardStudy]]
- 내용: Claude 접속 제어 웹 시스템 구축 (Flask 서버 + Pi Hook + uttecEdu 명령 + 교육 만료 자동 삭제)
- 산출물: aiHardStudy/중소기업교육/출석체크/ (app.py, 사용설명서.html 등 6파일)

## [2026-04-30] ingest | 중소기업교육 커리큘럼 작성 + Shield 포트 연결 정리
- 참조: [[aiHardStudy]], [[스마트팩토리]]
- 내용: 용인 중소기업진흥원 대면교육 커리큘럼 (3h x 5회 = 15시간), Shield CN1 40핀 핀맵 문서화, Claude 설치/삭제 가이드
- 산출물: aiHardStudy/중소기업교육/교육자료/, Claude_설치_및_삭제_가이드.md

## [2026-04-29] ingest | 업무효율화 시뮬레이션 Wiki 2종 구축 (한국기계 31파일 + 태명과학 48파일)
- 참조: [[스마트팩토리]]
- 내용: Obsidian+Claude 업무효율화 대상업종 28개 도출, 한국기계/태명과학 시뮬레이션 Wiki 구축
- 산출물: smartFactory/업무효율화/ (대상업종_리스트 + 한국기계/ + 태명과학/)

## [2026-04-28] ingest | 중소기업육성회 Pi 공장자동화+AI 교육 커리큘럼 작성
- 반영: [[projects]] — 신규 프로젝트 추가
- 핵심: 대면(5일 30h) / 원격(8주 32h) 2안, Pi4B+자체Shield+Camera 키트, AI(이상탐지+비전+API) 포함
- uttec Pi(192.168.1.27) 한글 입력 환경 설정 (fcitx+hangul)

## [2026-04-28] ingest | 한국기계/태명과학 AI 업무효율화 계획서 완성
- 반영: [[projects]] — 스마트팩토리 데모/영업에 2개 계획서 추가
- 핵심: Obsidian+Claude+Notion 기반 업무 지원 플랫폼 설계, 각 md+html+pdf 3종 생성
- 태명과학 차별점: 부속품 호환성 매트릭스 DB, 재질 의사결정 트리, 입도분석 자동 해석

## [2026-04-28] ingest | C6-LCD 사전빌드 105개 완성
- 반영: [[projects]] — C6-LCD 상태 업데이트 (105개 빌드+SDLOAD 파이프라인 완성)
- 핵심: SD 카드 SDLOAD 방식으로 서버 없이 교육 가능, BLE 콜백 스택 오버플로우 해결

## [2026-04-28] ingest | multiCore Claude 교육 시스템 위키 등록
- 참조: [[multiCore]], [[projects]], [[skills]]
- Odroid C2 서버(100.89.56.69) 실환경 검증 결과 정리
- 상세 문서 9개: 서버환경, 학생계정, 웹서버, SSH 가이드, 인증, 코어할당, 검증결과, 갭분석, 비밀번호관리
- 핵심 교훈: Claude TUI는 SSH만 가능, .claude.json 독립 필수, OAuth 동시 불안정
- raw/multiCore junction 생성

## [2026-04-27] lost | 위시캣 #154780 무산 — 가격 불일치
- 참조: [[위시캣활동]]
- PVDF 층간소음 MVP, 매칭률 100%, 미팅+계획서까지 진행했으나 가격 협상 결렬
- 교훈: 소규모 MVP(1,000만원)는 클라이언트 가격 기대치가 낮을 수 있음

## [2026-04-27] ingest | 위시캣 #154889 지원
- 참조: [[위시캣활동]], [[experience]]
- 소각장 멀티모달 화재 탐지 AI SW (2,000만원/60일)
- Jetson Orin + TensorRT + Modbus/GPIO — AI 모델 개발 핵심, 산업 인터페이스 강점 부각
- 매칭 8항목 중 O:4 △:4, 솔직한 갭 분석 포함

## [2026-04-27] ingest | CC1101 리모콘 데모 프로젝트 완성
- 참조: [[revita]], [[skills]]
- revita 서버 /home/uttec/revita/remocon/ 에 Zephyr 프로젝트 구축
- pca10056 2대 + CC1101 HW-863 2개 → 433.92MHz 무선 버튼→LED 토글 데모
- SPI pinctrl 오버라이드로 pinmap.md 배선 그대로 사용 (DTS 기본 핀과 다름)
- CC1101 커스텀 SPI 드라이버 작성 (Zephyr 공식 미지원)
- Windows nrfjprog 원격 플래시 워크플로우 확립

## [2026-04-25] use | 삼환 제안서 전면 재작성 — 전기차 충전 안전관리 추가
- 참조: [[revita]], [[양산제품]], [[위시캣활동]]
- 판단: 조명제어만으로는 가격 경쟁에 불리 → 전기차 충전소 안전관리를 결합하여 차별화
- 5중 감시(열화상/전류/가스/연기/환경) + 3단계 자동 대응 + 스마트 전력관리
- 핵심 메시지: 조명+EV안전을 하나의 LoRa 무선 플랫폼으로 통합 (경쟁사 대비 유일)
- 결과: 제안서 MD + 시스템구성도 HTML + 프레젠테이션 HTML + PDF 2종 생성

## [2026-04-25] market | 위시캣 #154809 TI C2000 검토 → 불가 확정
- 참조: [[위시캣활동]]
- TI C2000 기반 AE iHP 국산화 (2.3억/548일) — 기술 매칭 높으나 규모/부담 과대
- 위시캣 지원 4건 추적: #154763, #154800, #154806 미팅대기, #154780 계약대기

## [2026-04-24] use | PVDF 층간소음 경고 시스템 개발계획서 제출
- 참조: [[위시캣활동]], [[experience]], [[skills]]
- 판단: PVDF 미팅 결과 → 아이 뛰기 충격 감지 경고 시스템으로 구체화
- Charge Amplifier + ESP32 + FreeRTOS 설계, 45일 일정
- 결과: 클라이언트에게 계획서 PDF 제출 완료, 계약 대기

## [2026-04-24] ingest | 초등학교 AI 바이브코딩 교육 준비
- 참조: [[사전빌드]], [[experience]]
- 5월부터 초등 4/5/6학년 대상 주 1회 교육 가능성
- 사전빌드 155개 예제 기반 8주 교안 + AI교육 이력서 작성
- 교육 사업 확장의 첫 실전 기회

## [2026-04-23] use | 삼환 아파트 조명제어 시스템 제안서 작성
- 참조: [[revita]], [[회사소개]], [[양산제품]], [[위시캣활동]]
- 판단: REVITA RAK4630 기술을 아파트 조명제어로 확장 적용
- UTTEC 조명 납품 이력(골프장, 하나금융, 일본 3,800대)과 LoRa 기술 결합
- 결과: 삼환제안서/ 폴더에 제안서 + 시스템 구성도 생성

## [2026-04-23] market | 위시캣 #154780 PVDF 미팅 확정
- 참조: [[위시캣활동]]
- 클라이언트: 임수정 (matmall), 안산 POST-BI센터
- 미팅: 2026-04-24(금) 16:00~16:50 대면
- 의미: 지원 당일 미팅 확정 — 매칭률 100% (9/9)가 속도에 영향

## [2026-04-23] update | 위시캣 4건 지원 + wiki 연계 체계 구축
- 위시캣활동.md: 4건 지원 이력 추가 (#154780, #154806, #154800, #154763)
- experience.md: 4월 활동에 위시캣 4건 지원 + BLE Mesh 부각 기록
- /wishket-apply 스킬 개선: wiki 참고(영업전략, 회사소개, 위시캣활동) + wiki 업데이트 절차 추가
- 교훈: 지원서 작성 시 wiki 영업전략/회사소개의 수출 실적, 사업 방향을 반드시 반영해야 함

## [2026-04-22] thought | 사업 전환 선언 — LED→AI 3대 사업
- thoughts/2026-04-22_사업전환-AI시대.md 작성 — 전환 배경, 3대 사업 정의, 복리 인사이트, 리스크
- ai-direction.md 재정의: 사업 전환 선언 + 판단 로그 4건 추가 + 전략적 방향 재작성
- goals.md 장기 비전 3대 사업으로 교체, 핵심 질문 업데이트
- 영업전략.md: 신규 AI 3대 사업 추가, 기존 사업은 "참고용" 분류
- me.md: 사업가 섹션 전면 개편

## [2026-04-22] ingest | 회사소개서 수집 + 회사 엔티티 생성
- raw/회사소개 → homepage/회사소개 junction 연결
- entities/회사소개.md 신규 생성: 연혁(2016~2023), 인증(KC/TELEC/CE), 특허(한일), 납품처 8곳, 기술 진화 스토리
- 회사소개서(2024.10) PDF 18페이지 분석 반영

## [2026-04-22] update | 위키 목적 체계 확장 (3→6 목적)
- CLAUDE.md 목적을 3개 → 6개로 확장: 내부 역량(자기 이해, 개선점 도출) + 외부 환경(시장 이해, 사업 성과 추적) + 의사결정(방향 판단, 복리 성장)
- 해석 워크플로우에 고객/매출/경쟁 재료 추가
- 활용 로그에 revenue/lost/market 카테고리 추가
- 사업 방향 판단 프레임워크 5개 질문 추가
- 페이지 업데이트 주기에 시장/고객/경쟁 엔티티 트리거 추가

## [2026-04-22] ingest | revitaProject junction 추가
- raw/revitaProject → C:\todo\revitaProject junction 연결
- revita.md 엔티티에 revitaProject 코드베이스 정보 통합 (별도 엔티티 불필요)

## [2026-04-22] ingest | 미반영 폴더 10개 일괄 수집 + 엔티티 생성
- raw/ junction 10개 추가: aiStudy, remotion-project, 유투브, 동영상, ffmpeg, figma, gsd, skill, nlm, 전시회
- 신규 엔티티 10개: aiStudy, remotion-project, 유투브, 동영상, ffmpeg, figma, gsd, skill-자동화, nlm, 전시회
- ubuntu-s-2vcpu-4gb-sgp1-01은 서버인프라 엔티티에 통합, pem은 제외 (민감 데이터)
- CLAUDE.md에 반자동 엔티티 감지 규칙 + raw/ 추가 체크리스트 추가
- root 폴더 전수 대조 → 미반영 0건 달성

## [2026-04-22] update | P1~P9 Wiki 개선 전체 완료
- experience.md: 4/20~4/22 활동 9개 항목 추가
- 서버인프라.md: 5대 서버 전수 조사 결과 반영, 요약 테이블 추가
- tailscale네트워크.md: IP 오류 수정, 3대 추가, 용도 컬럼
- goals.md: 단기 +4, 중기 +2, 완료 목표 6건, 핵심 질문 +1
- dashboard.md: dataview 대시보드 신규 생성 (6개 쿼리)
- raw/: webServer, 응원봉 junction 추가, CLAUDE.md 구조 업데이트
- Notion 연동 설계 완료 (Obsidian=원본, Notion=모바일 창구)
- obsidian-git 확인: data.json 없음, 자동 백업 미설정 상태

## [2026-04-22] thought | Wiki 운영 3일차 소감
- thoughts/2026-04-22_wiki-운영-소감.md: 유지 습관, Lint 한계(교차검증), 프로젝트 분리, 작업보고서 이원화, Claude+Obsidian 조합
- index.md: 새 thought 페이지 등록

## [2026-04-22] lint | Wiki 정합성 첫 점검
- Lint 전 항목 PASS (A+): 깨진 링크 0, 고아 0, 모순 0, 프론트매터 정상
- experience.md: 4/20~4/22 활동 반영 (9개 항목 추가)
- Wiki 작업보고서 체계 신설 (myWiki/작업보고서/날짜별/)
- /wiki-log Skill 생성, /work-end wiki 마무리 기능 추가

## [2026-04-19] update | Claude Design 발견 + Figma MCP 판단
- ai-landscape.md: Claude Design (2026-04-17, Opus 4.7) 추가
- ai-direction.md: 판단 로그 2건 (Claude Design 발견, Figma 학습 보류)
- gaps.md: 프론트엔드 디자인 갭 해결 방안 업데이트

## [2026-04-19] entity | Notion 연동 + 위시캣 수주 반영
- thoughts/2026-04-19_notion-연계.md: Notion 역할 분담 계획
- thoughts/2026-04-19_notion-data.md: Notion 첫 수집 + RPi Claude 아이디어
- 위시캣활동.md: #153090 스마트팜 수주 성공 추가 (주3회, 월500만)
- projects.md, gaps.md: 수주 정보 반영

## [2026-04-19] ingest | 10개 프로젝트 폴더 수집
- raw/ junction 10개 추가: 충전기, ai-education-web, aiHardStudy, cuda, doctor, homepage, revita, smartFactory, tailscale, xerix
- 신규 엔티티 7개: 충전기, 의료AI, cuda교육, tailscale네트워크, uttec-homepage, ai-education-web, aiHardStudy
- 기존 엔티티 3개 보강: revita (Zephyr 아키텍처), xerix (상세 기술), 스마트팩토리 (코드베이스)

## [2026-04-19] ingest | 영업 + 외벽로봇 자료 수집
- raw/영업, raw/외벽로봇 junction 링크 생성
- 영업 자료 5건 분석: 교육 SaaS, 스마트팩토리, 영업관리 마케팅 계획서
- 외벽로봇 자료 3건 분석: 컨셉 분석, 개선 설계, ESP32 모바일 리서치
- entities/영업전략.md, entities/외벽로봇.md 생성

## [2026-04-19] entity | 엔티티 페이지 11개 생성
- 사전빌드, python-vibe, uttec-edu, claude-code, ai-fanstick
- xerix, revita, 위시캣활동, 스마트팩토리, 양산제품, 서버인프라
- 각 엔티티가 핵심 위키 페이지들과 상호 연결 (총 60개+ 링크 추가)
- 인덱스 업데이트

## [2026-04-19] ingest | 작업보고서 전체 수집 (2025-12 ~ 2026-04)
- 110개+ 작업보고서 분석 (12월 17개, 1월 33개, 2월 29개, 3월 29개, 4월 19개)
- experience.md 대폭 보강: 월별 핵심 활동 타임라인 추가
- projects.md 대폭 보강: 완료/운영 프로젝트 10개+, 이월 항목 패턴 발견
- skills.md 대폭 보강: 사용 빈도 + 양산 제품 5개 목록 추가
- ai-direction.md 보강: 판단 로그 14건, 위시캣 시장 인사이트 추가
- strengths.md 보강: 실적 증거 + 작업 패턴 강점 추가
- gaps.md 보강: 이월 패턴, 계획 vs 실행 불일치, 시장 미스매치 발견
- ai-landscape.md 보강: 검증된 도구 조합 5세트 추가

## [2026-04-19] ingest | 위시캣 지원서 수집 (2026-02 ~ 2026-04)
- 16건 지원서 분석 (2월 2건, 3월 8건, 4월 6건)
- ai-direction.md에 위시캣 시장 인사이트 + 차별화 전략 추가
- 지원서 진화 패턴 발견: 단순→아키텍처→갭분석
- 핵심 브랜딩: "38년 경력 + 5개 양산 제품"

## [2026-04-19] init | 위키 초기 구축
- 스키마(CLAUDE.md) 작성
- 핵심 페이지 9개 생성: me, skills, experience, projects, goals, ai-landscape, ai-direction, strengths, gaps
- 첫 번째 생각 페이지 작성
- 인덱스 생성
- raw/ 폴더 구조 구축 (위시캣, 작업보고서 junction 링크)
