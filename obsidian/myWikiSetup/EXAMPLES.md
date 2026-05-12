# 실 사례 — UTTEC myWiki + REVITA 협업 (2026-05-12)

> 본 문서는 본 패키지가 실제로 어떻게 작동했는지 보여주는 검증 사례.
> 출처: UTTEC (㈜유티텍) — 1인 기업, 임베디드 38년 경력 + AI 통합 사업 전환 중

## 시스템 구성

```
┌──── mywiki-claude ────┐         ┌──── revita-claude ────┐
│ 작업: C:\todo\today\  │         │ 작업: C:\todo\         │
│       myWiki\         │         │       revitaProject\  │
│                        │         │                        │
│ 역할: 사업 second-brain│         │ 역할: REVITA 기술 위키 │
│ - entities/ 44개      │         │ - entities/ 32개      │
│ - thoughts/ 11개      │         │ - gotcha 21개         │
│ - 영업·강점·갭·방향   │         │ - ingest 사이클 #4~#8 │
└────────────────────────┘         └────────────────────────┘
         ↕ _inbox/ (양방향 비동기)
```

## 시간선 — 시스템 도입 흐름

### 2026-05-08 (도입 전 — 기존 상태)

- 양 위키 별도 운영
- revitaWiki는 ingest #7까지 자체 사이클로 잘 운영
- myWiki는 revita 자료를 부분적으로만 흡수 (혹은 누락)
- 사용자가 양쪽 broker 역할 매번

### 2026-05-12 (도입 일자)

#### 단계 1 — 진단 thought 작성
**산출**: `myWiki/thoughts/2026-Q2/2026-05-12_revitaWiki-myWiki-비대칭.md`

**핵심 발견**: revitaWiki entities 32 + gotcha 21 = 53건 자료 / myWiki/skills.md 흡수 키워드:
- OOK: 3회
- CC1101 / Modbus: 각 1회
- **Zephyr / libopencm3 / RAK4631 / INA219: 0회**

→ **자료의 약 90%가 사업 자산으로 미흡수** 진단.

#### 단계 2 — 정책 신설 (myWiki/CLAUDE.md)
"외부 위키 흡수 (Absorption)" 단계 신설 + 5단계 체크리스트 정식화.

#### 단계 3 — Multi-agent 통신 시스템 합의

| 카드 | from → to | type | 의미 |
|---|---|---|---|
| #001 | revita → mywiki | request | ingest #8 흡수 요청 (사용자 broker로 임시 전달) |
| #002 | revita → mywiki | acknowledge | 통신 시스템 ACK + 위치 조정 제안 |
| #003 | mywiki → revita | done | 합의 + 셋업 완료 |
| #004 | mywiki → revita | done | ingest #8 흡수 완료 |
| #005 | mywiki → revita | request (low) | work skill 정합화 권고 |

→ 4 카드 lifecycle 정상 완료 (사용자 broker는 #001·#002 단계만, 그 후 무인화).

#### 단계 4 — 첫 흡수 사이클 결과

revitaWiki ingest #8 (BASE `18bfce8f` → HEAD `1da01060`, 5/9~5/12) 흡수:

**5단계 처리 결과**:

| # | 흡수 단계 | myWiki 변경 |
|:-:|---|---|
| 1️⃣ | skills/strengths | "원격 모니터링 풀스택" 4 라인 신규 + "현장 배포 운용 자산" 섹션 |
| 2️⃣ | gotcha → gaps | "현장 배포 함정 패턴" 섹션 신설 + 3건 (CP2104 / RPi UV / Chart.js CDN) |
| 3️⃣ | decision → ai-direction | 판단 로그 2건 (3계층 자동화 패턴 + 원격 모니터링 사업 라인) |
| 4️⃣ | 매칭 패턴 → thoughts | **신규 thought**: `2026-05-12_원격모니터링-사업라인.md` (7종 응용 영역 매트릭스) |
| 5️⃣ | revita entity | `entities/revita.md` § ingest #8 흡수 신설 |

**발견된 사업 자산 6건**:

| 자산 | 가치 |
|---|---|
| 사업 라인 발견 | Solar Monitor + 골프수조 = 동일 풀스택 → 농업 / 양식 / 산업 / 일본 자전거 / 태양광 발전소 등 7종 응용 영역 |
| 강의 자산 3건 | 현장 배포 함정 3종 = 호오컨설팅·인프런·강사양성 교재 사례 |
| 차별화 카피 | "검증된 풀스택 보유 — 데모는 누구나 / 운용은 1인 기업이 직접" |
| 영업 trigger | 한림용인CC 시공 (1,000만원, 시공 직전)에 Solar 자산 즉시 재사용 |

#### 단계 5 — 시스템 영구화 (work-start / work-end 통합)

- `today/.claude/skills/work-start/SKILL.md § 1-C` 신설
- `today/.claude/skills/work-end/SKILL.md § 5-E / 5-F / 5-G` 신설
- `myWiki/_inbox/SYSTEM_GUIDE.md` 신설

## 사례 — 한림용인CC 골프 프로젝트 흡수 (today/ 신규 폴더 정책 작동)

같은 날 별개 발견: `today/project/골프_수조_물관리/` 폴더가 INDEX·myWiki entity 모두 미감지 상태 (1,000만원 매출 직전 프로젝트인데 2일 방치).

**흡수 결과**:
- `entities/한림용인cc-고가수조.md` 신설 (8KB)
- `회사소개.md` 거래 이력 갱신
- `영업전략.md` "기존 고객 신규 사업장·영역" 패턴 신설 (재거래)
- `skills.md` LoRa E22 / 수위센서 / 펌프제어 3 라인 신규
- `today/INDEX.md` 비즈니스 카테고리에 골프 등재
- "컨테이너 폴더 sub-folder 등재 정책" 신설

**영업 인사이트**: 2020년 한림광릉CC (조명) → 2026년 한림용인CC (수조) = **기존 고객 그룹의 신규 사업장에서 새로운 영역**. 한림그룹 산하 골프장 다수 → 본 사례 성공 후 복제 가능.

## 핵심 자산 매핑

본 사례에서 만들어진 자산이 본 패키지의 어느 부분에 대응되는지:

| 자산 (실제 파일) | 본 패키지의 template |
|---|---|
| `myWiki/CLAUDE.md` § "외부 위키 흡수" | `templates/01_second-brain/CLAUDE.md` |
| `myWiki/_inbox/PROTOCOL.md` | `templates/02_inbox/PROTOCOL.md` |
| `myWiki/_inbox/SYSTEM_GUIDE.md` | `templates/02_inbox/SYSTEM_GUIDE.md` |
| `myWiki/.claude/hooks/check-inbox.py` | `templates/03_hooks/check-inbox.py` |
| `today/.claude/skills/work-start/SKILL.md § 1-C` | `templates/04_skills/work-start-snippet.md` |
| `today/.claude/skills/work-end/SKILL.md § 5-E/F/G` | `templates/04_skills/work-end-snippet.md` |
| `today/INDEX.md` | (별도 — today 폴더 카테고리화) |

## 효과 측정 — 1주일 후 / 1개월 후 / 분기 후

**1주일 후 점검** (예상):
- 다음 ingest #9 발생 시 사용자 broker 없이 자동 흡수 사이클 닫히는지 확인
- 일상 entity·thought 작성 흐름 자연스러운지

**1개월 후 (6/12)** (예상):
- myWiki/skills.md 신규 키워드 등장 빈도 재측정 (Zephyr / RAK4631 / INA219 → ≥1회 목표)
- 새 매칭 패턴 thought 1건 이상 생산 여부

**분기 후** (예상):
- 새 매출 수주 또는 영업 진행 사례 1건 (한림용인CC 시공 사례 적용)
- 7종 응용 영역 중 1~2개 영업 시도

## 다른 회사에 도입할 때 — 시사점

| 본 사례 관찰 | 다른 회사 도입 시사점 |
|---|---|
| 위키 2개 분기되면 90% 흡수 누락 | 도입 초기부터 흡수 정책 + 통신 통로 셋업 권장 |
| Multi-agent 카드 첫 사이클 4 카드로 완전 닫힘 | 시스템은 가벼움 — 사용자 broker 단계만 첫 1~2 카드 |
| 5단계 흡수가 한 사이클당 5~15분 소요 | 일상 부담 적음 — 자동화 가치 크다 |
| 발견된 사업 자산 6건 (한 사이클 흡수에서) | 비대칭이 클수록 첫 흡수 가치도 큼 |
| work-start/end 통합으로 시스템 영구화 | 정책 만들고 통합 안 하면 시간 지나며 잊혀짐 |

## 도입 후 변화 (UTTEC 사례)

| 측면 | Before | After |
|---|---|---|
| 사용자 broker 부담 | 매 ingest마다 | 첫 1~2 카드만 (이후 자동) |
| revita 자료 흡수율 | 10% 미만 | 정책 발동 시마다 5단계 완전 흡수 |
| 사업 자산화 | 우연·직관 | 명시적 5단계 + 박제 |
| 새 Claude 진입 시간 | 매번 처음부터 | SYSTEM_GUIDE.md 한 번 읽으면 |
| 시스템 자체 유실 위험 | 시간 지나면 잊힘 | work-end § 5-G로 자산 검증 |

→ 본 패키지로 자기 회사에도 같은 변화 가능.
