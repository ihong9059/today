# uttecBizWiki — onDevice AI 제품 비즈니스 wiki

> **상태**: ✅ 본격 진입 (2026-05-07~)
> **scope**: **`onDevice_AI/` 개발 제품의 비즈니스 전용**
>             (AI FanStick 차세대 + Stage 4 영업 패키지)
> **다른 사업 영역은 본 vault에 포함하지 않음**

---

## 한 줄 정의

`onDevice_AI/` vault에서 개발하는 제품(AI FanStick 차세대 + Stage 4 패키지)의 **비즈니스 전용 vault**. 영업·매출·고객을 기술 vault와 분리 운영.

## 본 vault에 포함하는 것

✅ **AI FanStick 차세대 비즈니스** — K-POP 시장·매출 모델·특허·BOM
✅ **Stage 4 패키지 비즈니스** — 1인 사업자 영업·수주·B2B
✅ **위 두 제품의 고객사** — 한국기계(Stage 4 후보) / 임베디드 스타트업
✅ **위 두 제품의 검증 결과 비즈니스 반영** — onDevice_AI → 영업 자료

## 본 vault에 포함하지 않는 것 (별도)

❌ **위시캣 일반 활동** — myWiki entities/위시캣활동.md
❌ **한국기계 Stage 0 영업 (LED·기계 일반)** — 영업/Stage0_Core_Services_견적서.md
❌ **강사양성 파일럿** — aiStudy/.../강사양성_파일럭/, myWiki entities/강사양성_파일럿.md
❌ **정부지원 교육사업** — 영업/정부지원_교육사업/
❌ **uttec-edu, REVITA, 스마트팩토리 등 다른 제품** — myWiki에서 처리

→ 본 vault는 **단일 제품군(onDevice AI 제품 = AI FanStick 차세대 + Stage 4)** 전용.

## 3-vault 구조 (5/7 확정)

| vault | 역할 | 본 vault와의 관계 |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구+모든 사업 영역 통합 | 본 vault 외 다른 영역 처리 |
| **`uttecBizWiki/`** | **onDevice AI 제품 비즈니스 전용** | (본 vault) |
| `onDevice_AI/` | 같은 제품의 **기술 검증** (단기) | 본 vault와 한 쌍 |

→ **본 vault ↔ onDevice_AI** = **비즈니스 ↔ 기술** 제품 한 쌍.

## cross-link 흐름

```
[onDevice_AI] 기술 검증
   Phase 1·2·3 진행 (microGPT + ESP32-S3 + AI FanStick 차세대)
       ↓ 검증 결과 (실측 SRAM·시간·BOM)
       ↓
[uttecBizWiki] (본 vault) 비즈니스
   entities/AI_FanStick.md "기술 근거" 갱신
   Stage 4 영업 자료 활용
   K-POP / 임베디드 스타트업 영업
   수주·매출 추적
       ↑ 영업 요구사항 (시장이 원하는 기능)
       ↑
[onDevice_AI] 다음 검증 사이클
```

## 폴더 구조

```
uttecBizWiki/
├── README.md                   ← 이 파일
├── CLAUDE.md                   ← 운영 schema
├── index.md                    ← 페이지 인덱스
├── log.md                      ← 시간순 활동 (제품 비즈니스만)
├── 0_검토_노트.md              ← 5/5 작성, 보존
│
├── entities/                   ← 제품·고객·매출 모델
│   └── AI_FanStick.md          ← ★ 제품 1 (현재 + 차세대)
│   (예정) Stage4_패키지.md     ← 제품 2 (B2B 영업 패키지)
│   (예정) 한국기계_Stage4.md   ← Stage 4 첫 수주 후보
│   (예정) K-POP_시장.md        ← AI FanStick 시장
│
├── raw/                        ← 영업 이벤트 (제품 관련만)
│   (예정) 시간순 미팅·매출 기록
│
└── thoughts/                   ← 패턴·인사이트 (제품 비즈니스)
    (예정) 운영 중 추가
```

## 다음 영역 추가 시점

본 vault에 추가할 entity (모두 onDevice AI 제품과 직결):

| 추가 시점 | entity | 이유 |
|---|---|---|
| onDevice 검증 진행 중 | `Stage4_패키지.md` | 영업 사이클 명확화 |
| 한국기계 Stage 4 컨택 시 | `한국기계_Stage4.md` | 수주 추적 |
| K-POP 시장 1차 진입 | `K-POP_시장.md` | B2C 매출 모델 |
| 임베디드 스타트업 컨택 | `임베디드_스타트업.md` | Stage 4 잠재 고객 |

→ 본 vault는 **제품 단위로 entity가 추가**되며, 다른 사업 영역(위시캣·강사양성 등)은 추가하지 않습니다.

## 다음 행동 (5/7~)

| 시점 | 행동 | scope |
|---|---|---|
| **5/8~10 (이번 주말)** | onDevice 검증 Phase 1A 결과 기다림 | (uttecBizWiki는 대기) |
| 검증 완료 후 | `entities/AI_FanStick.md` "기술 근거" 갱신 | 제품 비즈니스 |
| 영업 미팅 시 | raw/ 미팅 기록 (한국기계 Stage 4 / 임베디드 스타트업) | 제품 영업 |
| 첫 수주 | thoughts/ 인사이트 작성 | 제품 비즈니스 |

## 메타

- 검토 노트 작성: 2026-05-05
- 본격 진입 결정: **2026-05-07**
- scope 정정: **2026-05-07** (광범위 사업 운영 → onDevice AI 제품 전용으로 좁힘)
- 첫 entity: AI FanStick (제품 1)
- 다음 entity 후보: Stage4_패키지 / K-POP_시장 / 한국기계_Stage4
