# Sub-Vault Template (Tier 2 프로젝트용)

> **목적**: 중간 규모 프로젝트(1,000만~5,000만, 30~120일, 산출물 多)의 **격리된 위키 공간** 표준 템플릿.
>
> **위치**: `today/project/{프로젝트명}/wiki/` 안에 설치.
>
> **신설일**: 2026-05-17 (한림용인CC 1번째 적용)

---

## Tier 분류 정책

| Tier | 금액 | 기간 | 코드량 | 구조 | 셋업 비용 |
|:-:|---|---|---|---|---|
| **1 — 단발** | ≤ 1,000만 | ≤ 30일 | 거의 없음 | `project/{name}/` + myWiki entity 1개 | 5분 |
| **2 — 중간** ⭐ | 1,000만~5,000만 | 30~120일 | 산출물 多 | `project/{name}/wiki/` (본 템플릿) | 20분 |
| **3 — 장기/제품** | ≥ 5,000만 | ≥ 6개월 | 자체 코드베이스 | 별도 repo + multi-agent 합류 | 1시간+ |

→ 본 템플릿은 **Tier 2** 전용. Tier 1은 myWiki entity로 충분, Tier 3은 별도 repo 패턴 사용.

---

## 사용법

### 1. 신규 프로젝트에 적용

```powershell
robocopy "C:\todo\today\templates\sub-vault-template" "C:\todo\today\project\{프로젝트명}\wiki" /E
```

### 2. 초기 채우기

- `wiki/CLAUDE.md` — 프로젝트 가이드 (상위 문구는 그대로, 프로젝트별 변수만 갱신)
- `wiki/log.md` — 첫 항목 박제 (`## [YYYY-MM-DD] start | 프로젝트 시작`)
- `wiki/entities/` — 핵심 entity 1~2개부터 시작 (현장·발주자·핵심자재 등)
- `wiki/thoughts/2026-Q{N}/` — 결정 기록 (필요 시)

### 3. myWiki 연결

- `today/myWiki/second-brain/entities/{프로젝트명}.md` 신설 (CLAUDE.md 정책 참조)
- entity 본문에 sub-vault cross-link 추가: `[[../../project/{프로젝트명}/wiki/log|시공/진행 일지]]`
- `today/myWiki/second-brain/index.md` 갱신
- `today/myWiki/second-brain/log.md`에 `## [날짜] subvault | 프로젝트명 sub-vault 신설`

### 4. INDEX.md 갱신

`today/INDEX.md` 비즈니스/제품 섹션에 등재 (이미 등재된 폴더면 sub-vault 추가 메모만).

---

## 라이프사이클

```
[프로젝트 시작]
   ↓
sub-vault 신설 (본 템플릿 robocopy)
   ↓
단계별 박제 (log.md + entities + thoughts)
   ↓
[프로젝트 완료]
   ↓
myWiki 흡수 — sub-vault 핵심 자산을 entity로 추출
   ↓
archive/ 폴더로 산출물 이동 (불변)
   ↓
필요 시 wiki/ 폴더 자체를 archive로 이전 또는 삭제
```

**승격 경로**: sub-vault가 커지거나(파일 50+, 6개월+) 자체 코드베이스 보유 → **Tier 3 별도 repo로 승격** (revita/onDevice_AI/wishket 패턴).

**강등 경로**: 없음. Tier 결정은 한 방향만.

---

## 폴더 구조

```
wiki/
├── README.md               ← 본 가이드 (적용 시 프로젝트별로 갱신 또는 삭제)
├── CLAUDE.md               ← 프로젝트별 Claude 가이드
├── log.md                  ← 시간순 박제 (single source of truth)
├── entities/               ← 현장·자재·노드·발주자 등 객체
│   └── .gitkeep
├── thoughts/               ← 결정 기록 (분기별)
│   └── .gitkeep
└── archive/                ← 완료 후 산출물 보관 (불변)
    └── .gitkeep
```

---

## 자산화

### myWikiSetup 5번째 사례 (Tier 2 sub-vault 패턴)

- `obsidian/myWikiSetup/EXAMPLES_tier2_subvault.md` (한림용인CC 사례 박제)
- 분리 lifecycle 3단계 진화 패턴(Tier 3용)과 별개 — **Tier 2 라이프사이클** 정립

### 향후 후보

- 위시캣 #155381 PLC (1,000만/30일) — 완료 후 회고용 sub-vault 도입 검토
- 위시캣 #155365 STGNN AI (1,300만/60일) — 60일 라이프사이클 활용
- 추후 한림그룹 내 다른 골프장 시공 — 한림용인CC sub-vault 자산 재사용
- xerix MFC Controller — 견적 협상 단계에 따라 Tier 결정
