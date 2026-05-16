# EXAMPLES_wishket — 시나리오 D 네 번째 적용 사례

> **wishket-claude 합류** (2026-05-16): 위시캣 영업 자산을 today repo에서 분리 → wishketProject 신설 → multi-agent 합류. 6 Claude 시스템 + **사업 트랙 vault 첫 사례** + 분리 lifecycle 3단계 진화 첫 완전 사례.

## 한 줄 요약

> **분리(repo 신설) → 절대 경로화(분리 의미 명확) → multi-agent 합류(자동 협업) — 분리 lifecycle 3단계 진화의 첫 완전 사례. 제품/학습/자동화 트랙 외 "사업 트랙 vault" 정립.**

## 사용자 의사결정 lifecycle (질문 → 결정 박제)

본 사례의 영업 자산화 핵심: **사용자 5단계 의사결정 자체를 패키지 컨설팅 deliverable로 박제**.

### 1단계: 분리 제안 — "별도 wiki로 만들어 진행하는 것이 좋지 않을까요?"

**상황**: 위시캣 영업 자산이 today repo 안에 있음 (162 files / 39.7MB / 지원서 27건+).
**사용자 prompt**:
> "위시켓도 C:\todo\onDevice_AI와 같이 별도의 wiki로 만들어 진행하는것이 좋지않을까요? 그리고 이 folder에 있는 revita folder는 삭제해도 되지않을가요?"

**Claude 분석** (탐색적 응답, 권장 + 트레이드오프):
- ✅ 분리 적합 — 영업 자산 NDA·매출 직결, onDevice_AI 패턴 일치
- ❌ today/revita junction은 삭제 비추천 — 이미 disk 0 + myWiki entity 의존

**결정**: 사용자 "위시캣 분리 진행해주세요, 그리고 위시켓 skill도 분리된곳에서 실행되도록 해주세요."

### 2단계: 분리 실행 — 8 Phase (옵션 B junction 패턴 재활용)

| Phase | 작업 | 시간 |
|-------|------|:----:|
| 0 | gh CLI `ihong9059/wishketProject` private repo 생성 | 1m |
| 1 | wishketProject/ 폴더 + git init + .gitignore + README | 1m |
| 2 | robocopy today/위시캣 → wishketProject/위시캣 (39.7MB / 162 files) | 2m |
| 3 | skill 이동 + 내부 `지원서류/` outdated → `위시캣/ref/` 일괄 정정 | 3m |
| 4 | wishketProject 초기 commit + GitHub push | 1m |
| 5 | today에서 git rm --cached + 폴더 삭제 + NTFS Junction 3개 생성 | 2m |
| 6 | today/.gitignore 갱신 | 0.5m |
| 7 | myWiki 박제 (log + 위시캣활동 entity) | 1m |
| 8 | 검증 6 checks (junction 작동 / SKILL.md md5 일치 / skill 호출 등록) | 1m |

**결과**: 두 repo push 성공, junction 통해 today에서 기존 경로 그대로 작동.

### 3단계: 절대 경로화 지적 — "today에 junction이 있을 필요가 있냐"

**사용자 prompt**:
> "wishketProject으로 분리를 시켰는데, 있을 필요가 있냐는것입니다."

**핵심 통찰**: junction은 디스크 0이지만 **분리 의미를 흐림**. 사용자 의도 = "today에서 위시캣 흔적 0".

**Claude 해결책**:
1. SKILL.md 내부 `위시캣/` 상대 경로 → `C:/todo/wishketProject/위시캣/` 절대 경로 일괄 변경 (cwd 무관 동작)
2. today/위시캣 NTFS junction 삭제
3. .gitignore 정리 (`위시캣/` 라인 제거)
4. myWiki/raw/위시캣 symlink → junction으로 교체 (`/c/todo/today/위시캣` → `wishketProject/위시캣`)

**유지**: `today/.claude/skills/wishket-{check,apply}` junction (cwd=today에서 슬래시 명령 호출 위해 필수)

**결과**: today에서 위시캣 흔적 0, /wishket-* skill은 절대 경로로 wishketProject 직접 참조 (cwd 무관).

### 4단계: myWiki 자동 흡수 가능성 질문 — "wishketProject에서 작업을 하면, myWiki에 작용되도록 되어있나요?"

**Claude 답변**: 두 경로 구분
1. ✅ today cwd에서 슬래시 명령 (`/wishket-*`) → SKILL.md 안에 myWiki 갱신 로직 포함 (자동 박제 작동)
2. ❌ wishketProject cwd에서 별도 Claude → 현재는 자동 흡수 안 됨 (multi-agent 미구성)

**옵션 제시**:
- A. 현재 상태 유지 (today cwd 작업 흐름)
- B. wishket-claude multi-agent 합류 (시나리오 D 4번째 적용)

### 5단계: 합류 결정 — "B로 진행해주세요"

**Claude 실행** (shield-claude 합류 패턴 재활용, 7 Phase):
- **Phase A**: mini-vault (second-brain/CLAUDE·log·index·me + entities/wishket-platform + thoughts/2026-Q2/2026-05-16_wishket-claude-합류)
- **Phase A+**: _inbox/{PROTOCOL,SYSTEM_GUIDE}.md + pending/processed/ + .claude/hooks/check-inbox.py (SELF_ID="wishket-claude") + settings.local.json
- **Phase C**: 6 vault PROTOCOL/SYSTEM_GUIDE 동기 sync (4 Windows + n8n Ubuntu)
- **Phase D**: 합류 카드 4건 발송 (mywiki #003 + revita #004 + ondevice #004 + n8n #002)
- **Phase E**: myWiki entities/위시캣활동.md 갱신 + log 박제
- **Phase F**: myWikiSetup README + EXAMPLES_wishket.md (본 파일)
- **Phase G**: 검증

## 핵심 차별화 — 사업 트랙 vault 정립

| Vault | 트랙 | 흡수 트리거 |
|-------|------|------------|
| mywiki | 학습/도구 허브 | 모든 자산 종합 |
| revita | 제품 (REVITA) | ingest 사이클·entity 갱신 |
| ondevice | 제품 (AI FanStick + Stage 4) | 검증 결과·비즈니스 |
| shield | 제품 (RPi 응용) | 시험 결과·always-send |
| n8n | 자동화 학습 | 워크플로우 박제 |
| **wishket** | **사업 (영업)** ⭐ | **매칭 패턴·매출·미팅·무산** |

→ 향후 다른 사업 라인 (uttec-edu 등) 사업 트랙 vault 패턴으로 확장 가능.

## 분리 lifecycle 3단계 진화 (재사용 패턴)

| 단계 | 작업 | 효과 |
|------|------|------|
| **1. 분리 (옵션 B junction)** | repo 신설 + robocopy + junction 호환성 | 데이터 격리 + 즉시 호환성 |
| **2. 절대 경로화** | SKILL.md `상대경로/` → `절대경로/` | 분리 의미 명확화 + cwd 무관 동작 |
| **3. multi-agent 합류** | mini-vault + _inbox + check-inbox.py + always-send | 자동 협업 + myWiki 흡수 보장 |

→ 향후 분리 시 본 3단계 lifecycle을 표준 패턴으로 적용 권장.

## 자매 시스템 분담 협업 — n8n-claude ↔ wishket-claude

| 역할 | Claude |
|------|--------|
| 매일 09:00 cron 자동 매칭 평가 | **n8n-claude** (Ubuntu, wishket-prompt.txt) |
| 자동검색 결과 (high-fit ≥7) → wishketProject 카드 발송 | n8n-claude → wishket-claude |
| 지원서 정밀 작성 + 사이트 제출 + 결과 추적 | **wishket-claude** (Windows) |
| 영업 자산 종합 entity 갱신 | **mywiki-claude** |

→ 3 Claude 협업으로 영업 사이클 완전 자동화. 분산 호스트 (Windows + Ubuntu) 검증.

## 박제 자산 (5/16 시점)

- **wishketProject**: 162 files / 39.7MB / private repo `ihong9059/wishketProject`
- **수주 성공 1건**: #153090 nRF52 노지 스마트팜 (양산 진행 중)
- **미팅 도달 1건**: #155057 AISG 3.0 (5/12 미팅 제안)
- **본일 신규 제출 2건**: #155381 PLC 9/9 + #155365 STGNN 7/10+2
- **총 검토 632건+ / 총 지원 29건+**
- **6 vault PROTOCOL md5 일치**: `b963aae8...` (mywiki + revita + ondevice + n8n + wishket / shield는 다음 ssh sync 시)
- **6 vault SYSTEM_GUIDE md5 일치**: `cc5067f4...`

## 컨설팅 deliverable 자산화

본 사례의 **사용자 5단계 의사결정 lifecycle** 자체가 패키지 컨설팅 자산:
1. "별도 wiki로 만들어 진행하는 게 좋지 않을까요?" (분리 제안)
2. "skill도 분리된 곳에서 실행되도록" (skill 이동)
3. "today에 junction이 있을 필요가 있냐" (절대 경로화)
4. "myWiki에 작용되도록 되어있나요?" (multi-agent 합류)
5. "B로 진행해주세요" (결정)

→ 1인 기업 컨설팅 시 "분리 + 절대 경로화 + 합류 lifecycle" 표준 가이드로 제공 가능. **patcage = 분리 → 호환성 → 명확화 → 자동화 4단계**.

## 시나리오 D 누적 효과 (4 사례)

| 사례 | 호스트 | 도메인 | 트랙 |
|------|--------|--------|------|
| #1 ondevice (5/15) | Windows | AI 제품 | 제품 |
| #2 n8n (5/16) | Ubuntu | 자동화 학습 | 학습 |
| #3 shield (5/16) | RPi Linux | 하드웨어 응용 | 제품 |
| #4 **wishket (5/16)** | **Windows** | **영업 자산** | **사업** ⭐ |

→ 패키지 메타 검증 강화: OS 3종 (Windows · Ubuntu · RPi) + 도메인 4종 (제품·자동화·하드웨어·영업).

## 다음 단계 (wishket-claude 측)

1. shield ssh 가능 시 6번째 vault PROTOCOL/SYSTEM_GUIDE sync 완료
2. mywiki-claude 측 합류 카드 #003 처리 (5단계 흡수)
3. n8n-claude의 자동검색 결과 → wishket-claude 카드 발송 흐름 셋업
4. work-end SKILL § 5-F always-send 강제 룰 활성화 (다음 work-end부터)
5. 매주 영업 회고 thought 작성 (수주 패턴 학습)
