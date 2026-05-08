# uttecBizWiki — log

본 vault의 시간순 사업 운영 활동 기록.

---

## [2026-05-07 18:05] correction | scope 정정 — onDevice AI 제품 전용으로 좁힘
- 사용자 명확화: "uttecBizWiki는 onDevice_AI_검증 개발 제품에 대해서만 진행. 다른 biz는 관여하지 않음."
- 정정 내용:
  - **이전 scope (오해)**: UTTEC 사업 전반 (영업·견적·매출·고객사·플랫폼·경쟁사·의사결정 광범위)
  - **올바른 scope**: onDevice AI 제품(AI FanStick 차세대 + Stage 4)의 비즈니스 전용
  - **다른 사업 영역은 본 vault 미포함**:
    - 위시캣 일반 → myWiki/위시캣활동
    - 한국기계 Stage 0 → 영업/Stage0_견적서 + myWiki
    - 강사양성 → aiStudy/.../강사양성_파일럭/ + myWiki
    - 정부지원 → 영업/정부지원_교육사업/
    - uttec-edu, REVITA, 스마트팩토리 등 → myWiki
- 갱신: README.md, CLAUDE.md, index.md scope 명확화
- 핵심 결론: **본 vault는 단일 제품군(onDevice AI = AI FanStick 차세대 + Stage 4 패키지) 전용**. onDevice_AI_검증 vault와 1:1 한 쌍 관계.

## [2026-05-07 17:50] start | uttecBizWiki 본격 진입 — AI FanStick 첫 사업 영역

- 결정: 5/5 작성한 검토 노트 보류 → 본격 진입
- 트리거:
  1. 5/7 onDevice_AI_검증 vault 신설 (기술 vault) → 비즈니스 vault와의 분리 명확화
  2. 사용자 의사결정: "기술 개발과 이 제품 비즈니스 분리"
- 첫 사업 영역: **AI FanStick** (Stage 4 영업과 직결)
- 산출:
  - README.md 갱신 (보류 → 본격 진입)
  - CLAUDE.md 신규 (사업 운영 schema)
  - index.md 신규 (페이지 인덱스)
  - log.md 신규 (이 파일)
  - entities/AI_FanStick.md 신규 (비즈니스 관점)
- 다음 액션:
  - 5/8~10 (이번 주말): raw/ 첫 영업 이벤트 기록 (한국기계 회신 / 위시캣 결과)
  - 5/13 (월): thoughts/ 첫 인사이트 (위시캣 매출 패턴)
- 핵심 결론: **3-vault 분리 운영 시작**. myWiki(학습) + uttecBizWiki(사업) + onDevice_AI_검증(기술) 한 쌍. 같은 제품(AI FanStick / Stage 4)을 두 vault(기술↔비즈니스)에서 동시 추적.

---

## [2026-05-08 09:12] update | vault 인프라 보강 — `/biz-*` skill 신설 + 작업보고서 폴더

- 산출:
  - `.claude/skills/biz-start/SKILL.md` 신규 (vault 외, vault 전용 skill)
  - `.claude/skills/biz-end/SKILL.md` 신규 (vault 외, vault 전용 skill)
  - `작업보고서/2026-05-08_작업보고서.md` 신규 (vault 평가 + 갭 6개)
- 핵심 결론:
  - vault 진입/종료 트리거 확보. `/vault-*`(onDevice 검증)와 이름 충돌 없이 분리.
  - 평가 결과 진행 방법 갭 5개(보강 가능) + 1개(보류). 즉시 패치 후보: AI_FanStick "기술 근거" 섹션 / Stage4_패키지 골격 분리 / raw/ template.
- 다음 액션:
  1. AI_FanStick.md "기술 근거" 섹션 신규 (검증 흡수 위치 확보)
  2. Stage4_패키지.md 골격 분리 (검증 결과 기다리지 않아도 가능)
  3. onDevice 검증 Phase 1A 결과 (5/8~10) 기다린 후 흡수

---

(이후 영업·매출·미팅 이벤트 시간순 추가)
