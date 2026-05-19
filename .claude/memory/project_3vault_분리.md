---
name: 4-vault 분리 운영 (myWiki + onDevice_AI + lemonLabs + uttecHome) — 5/19 후반 확장
description: 사용자 second-brain 운영 구조. 5/7 3-vault → 5/15 2-vault → 5/19 오전 3-vault (lemonLabs 합류) → 5/19 후반 4-vault (uttecHome 분리). 작업 요청 시 어느 vault인지 먼저 판단 후 진행
type: project
originSessionId: b3245c42-bf7b-4dd3-a682-cd49deb90641
---
사용자는 **4개 vault**를 분리 운영한다 (2026-05-19 후반 uttecHome 합류로 확장).

| vault | 위치 | 역할 | scope |
|---|---|---|---|
| `myWiki/second-brain/` | `C:\todo\today\myWiki\` (today repo 안) | 학습+개인+도구+범 사업 영역 통합 | second-brain (영구, 매일) |
| **`onDevice_AI/`** | **`C:\todo\onDevice_AI\` (별도 git repo, private, ihong9059/onDevice_AI)** | **AI FanStick + Stage 4 제품 통합 (기술 검증 + 비즈니스)** | 한 제품의 처음부터 끝까지 |
| **`lemonLabs/`** | **`C:\todo\lemonLabs\` (별도 git repo, private, ihong9059/lemonLabs, 2026-05-19 오전 신설)** | **이진서 51% + UTTEC 49% 협업 신규 법인 — AI 응원봉/교육/Consulting/Studio 4 트랙** | 창업 트랙 — 2027 Q1 법인 설립 |
| **`uttecHome/`** ⭐ NEW | **`C:\todo\uttecHome\` (별도 git repo, private, ihong9059/uttecHome, 2026-05-19 후반 분리)** | **UTTEC 회사 홈페이지 + Obsidian second-brain (30 atomic notes + JSON data layer)** | 영업 첫 접점 — 장기 운영 |
| (참고) `revitaProject/` | `C:\todo\revitaProject\` (별도 repo) | REVITA 제품 (기술 + 위키) | 별도 제품 |

**Why (5/7 결정)**: 기술↔비즈니스 분리 + 외부 공개 안전. 3-vault로 시작.

**Why (5/15 재구성)**: 한 제품(AI FanStick + Stage 4)의 기술과 비즈니스가 두 vault에 분리되어 cross-link 비용이 컸음. 한 vault에서 검증→영업→수주 흐름을 일직선으로 단순화. uttecBizWiki는 컨텐츠 0에 가까운 schema 선언 상태 (1주 정전, 영업 이벤트 0건)였기 때문에 흡수 비용 낮음. revita 패턴(별도 repo + multi-agent _inbox) 검증된 모델 적용.

**Why (5/19 확장 — lemonLabs 합류)**: 이진서 협업이 5/9 결정 → 5/15 1차 신청 → 5/19 회사명 "레몬랩스" 채택 + 4 트랙 분류 + 5/20~6/12 5건 동시 지원 단계로 진입. 별도 법인(2027 Q1 설립) 자산은 UTTEC 자산과 법적·재무적으로 분리되어야 하므로 myWiki 안에 누적하면 안 됨. Tier 3 패턴 (별도 repo + multi-agent) 적용. **창업 트랙 vault 첫 사례** (기존: 제품 트랙 5 + 사업 트랙 1).

**Why (5/19 후반 — uttecHome 분리)**: today/homepage (nested git, `uttecHome-backup`) 가 4/25 이후 24일 정체. myWiki 정합성 갭 7건 발견(LoRa·AI FanStick·정체성·lemonLabs 등 미반영). 장기 개선 작업이 필요하나 today/ 안에 두면 다른 영역과 섞여 작업 비용 증가. **이미 별도 git repo로 50% 분리된 상태** + 사용자 명시 "장기간 작업" → Tier 3 승격 비용 매우 낮음. wishketProject·revitaProject·lemonLabs 패턴 미러 적용. 분리와 동시에 Obsidian second-brain 도입 + JSON data layer 빌드로 노트-코드 단방향 흐름 확립.

**구 3-vault → 신 2-vault 재구성**:
- `today/uttecBizWiki/` (5/7 신설, 5/14 정전) → `onDevice_AI/business/` (5/15 흡수)
- `today/onDevice_AI/` (5/7 신설, 5/14 운영) → `/todo/onDevice_AI/` (5/15 별도 repo)

**How to apply:**

### 작업 분류 기준 (어느 vault?)

```
사용자 요청 도착 → "이 작업은 무엇에 관한가?"
   ├── AI FanStick 차세대 / Stage 4 비즈니스 (UTTEC 단독 영업)
   │      → /todo/onDevice_AI/business/
   ├── ESP32-S3 + microGPT 기술 검증 (UTTEC 코드·실측·포팅·hardware)
   │      → /todo/onDevice_AI/ (검증 영역)
   ├── 이진서 협업 — 레몬랩스 사업·지원사업·콘텐츠·법인·UTTEC 의뢰
   │      → /todo/lemonLabs/
   ├── UTTEC 회사 홈페이지·회사소개서·web 컨텐츠·사례연구
   │      → /todo/uttecHome/  (또는 junction /todo/today/homepage)
   ├── REVITA 제품 (기술·위키·LoRa·BLE 등)
   │      → /todo/revitaProject/
   └── 그 외 모든 작업 (학습·도구·다른 사업·다른 제품)
          → today/myWiki/second-brain/
```

### 결정 트리 (헷갈리는 케이스)

| 케이스 | 어디에 |
|---|---|
| 한국기계 Stage 4 견적·미팅 | `/todo/onDevice_AI/business/` |
| 한국기계 Stage 0·1·2·3 일반 영업 | today/영업/ + myWiki |
| 위시캣 임베디드 IoT 공고 (Stage 4 매핑되면) | `/todo/onDevice_AI/business/` + myWiki/위시캣활동 둘 다 |
| 위시캣 일반 신규 공고 검토 | myWiki/위시캣활동 |
| K-POP HYBE 라이센스 컨택 | `/todo/onDevice_AI/business/` |
| AI FanStick 차세대 펌웨어 작업 | `/todo/onDevice_AI/aiFanStick_차세대/` |
| ESP32-S3 microGPT 포팅 | `/todo/onDevice_AI/microGPT/` |
| 강사양성 시범 운영 | aiStudy/.../강사양성_파일럭/ + myWiki |
| 디지털배움터 강사 신청 | today/영업/정부지원_교육사업/ |
| obsidian 강의 모듈 작성 | today/obsidian/강의모듈_2~3h/ |
| 새로운 학습·연구 | myWiki |
| 새 사업 라인 검토 (자영업 AI 등) | myWiki/entities (새 entity) |
| REVITA LoRa 거리 테스트 | revitaProject/project/lora_range/ |
| 이진서 협업 지원사업 신청 | lemonLabs/사업/지원사업/ |
| 이진서 응원봉 콘텐츠 작업 (영상·SNS) | lemonLabs/콘텐츠/ |
| 이진서 → UTTEC 기술 의뢰 (BLE Mesh 펌웨어 등) | lemonLabs/UTTEC협업/의뢰과제/pending/ |
| 레몬랩스 4 트랙 (응원봉/교육/Consulting/Studio) | lemonLabs/트랙_* |
| 레몬랩스 IR Deck·발표자료 | lemonLabs/사업/IR_pitch/ |
| UTTEC 홈페이지 컴포넌트 갱신 | uttecHome/uttec-web/src/components/ |
| 회사소개서 PDF 갱신 | uttecHome/회사소개/ |
| 사례연구 신규 (Solutions Cases) | uttecHome/uttec-web/public/cases/ + entities/clients/*.md |
| UTTEC 새 사업 영역(Solutions) 신설 | uttecHome/second-brain/entities/solutions/*.md → JSON 자동 빌드 |

### Multi-agent 통신 (vault 간)

- 7 Claude 시스템: `mywiki-claude` · `ondevice-claude` · `revita-claude` · `n8n-claude` · `shield-claude` · `wishket-claude` · **`lemonlabs-claude`** (5/19 합류)
- 각 vault `_inbox/{pending,processed}/` + `.claude/hooks/check-inbox.py`
- 통신 표준: 각 vault `_inbox/PROTOCOL.md` (동일 사본)
- 합의 일자: 2026-05-12 (mywiki+revita) + 2026-05-15 (ondevice) + 2026-05-16 (n8n·shield·wishket) + **2026-05-19 (lemonlabs)**

### Claude 작업 시 주의

- **새 파일 만들 때**: 위 결정 트리로 정확한 vault 결정 후 그 vault의 폴더 안에 배치
- **vault 이동 금지**: 같은 항목을 두 vault에 중복 작성하지 않기 (cross-link로 연결만)
- **각 vault의 CLAUDE.md 참조**: vault별 운영 규칙 다름
- **`/todo/onDevice_AI/business/`에 다른 사업 영역 추가 금지**: 위시캣 일반·강사양성·정부지원 등은 절대 본 vault에 추가하지 않음 (myWiki로)
- **multi-agent 카드**: 다른 vault에 영향 있는 변경 시 해당 inbox에 카드 작성 (work-end skill에서 자동화)

### vault 간 cross-link 흐름

```
[onDevice_AI 검증 영역] → 검증 결과 → [onDevice_AI/business/] → 영업 수주 → [onDevice_AI 검증] 다음 사이클
                                                          ↕
                                            [myWiki entities/uttec-stage-package, ai-fanstick, onDevice-ai]
                                            (큰그림에서 본 vault 참조)
```

### 옵시디언 vault 등록 (사용자 직접)

- 옵시디언에서 vault 별도 등록: `today/myWiki/`, `/todo/onDevice_AI/`, `/todo/revitaProject/` 각각
- `myWiki/second-brain/raw/` junction 갱신 필요:
  - `raw/onDevice_AI` → `/todo/onDevice_AI/` (5/15 재연결 필요)
  - `raw/uttecBizWiki` → 제거 또는 `/todo/onDevice_AI/business/`로 재연결
