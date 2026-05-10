# uttecBizWiki — schema (Claude 운영 규칙)

본 vault는 **onDevice AI 제품의 비즈니스 전용 작업 공간**.

## scope (책임 / 비책임) — 매우 중요

### ✅ 본 vault 책임 (onDevice AI 제품 비즈니스만)

- AI FanStick 차세대 비즈니스 (K-POP 시장·매출·BOM·특허·B2C/B2B/OEM)
- Stage 4 패키지 비즈니스 (1인 사업자 영업·수주·B2B)
- 위 두 제품의 **고객사** — 한국기계(Stage 4 후보) / 임베디드 스타트업 / K-POP 매니지먼트
- 위 두 제품의 검증 결과 비즈니스 반영 (onDevice_AI 결과 → 영업 자료)
- 위 두 제품의 영업·매출·미팅·계약 추적

### ❌ 본 vault 비책임 — 다른 vault/폴더에서 처리

| 영역 | 어디에 |
|---|---|
| 학습·개인·도구·큰그림 | `myWiki/second-brain/` |
| 기술 검증 (코드·보드·실측) | `onDevice_AI/` |
| 위시캣 일반 활동 | `myWiki/entities/위시캣활동.md` + `위시캣/` 폴더 |
| 한국기계 Stage 0·1·2·3 영업 (LED·기계 일반) | `영업/Stage0_Core_Services_견적서.md` + myWiki |
| 강사양성 파일럿 운영 | `aiStudy/introductionAi/강사양성_파일럭/` + myWiki |
| 정부지원 교육사업 | `영업/정부지원_교육사업/` + myWiki |
| uttec-edu, REVITA, 스마트팩토리 등 다른 제품 | 각 raw 폴더 + myWiki |
| 영업 견적서 1차 자료 | `영업/` 폴더 |

## 핵심 분리 원칙

> **"이 제품(AI FanStick 차세대 / Stage 4)의 비즈니스인가?"** — 답이 ✅이면 본 vault, ❌이면 다른 곳.

예시:
- "한국기계가 Stage 4 견적 받음" → ✅ 본 vault (Stage 4 영업)
- "한국기계 Stage 0 회신" → ❌ myWiki (Stage 0은 다른 제품)
- "위시캣 #156XXX 임베디드 IoT 공고" → ❌ 위시캣활동 entity (Stage 4 매핑되면 본 vault에도 추가)
- "K-POP HYBE 라이센스 컨택" → ✅ 본 vault (AI FanStick B2B 라이센스)
- "강사양성 시범 후기" → ❌ aiStudy/.../강사양성_파일럭/

## 운영 규칙

### 폴더
- `entities/` — 제품·고객·시장 (제품과 직결되는 객체만)
- `raw/` — 제품 영업 이벤트 (미팅·견적·계약)
- `thoughts/` — 제품 비즈니스 패턴·인사이트
- `log.md` — 모든 변경의 시간순 인덱스

### 파일 명명
- entities: 고유명사 또는 제품명 (`AI_FanStick.md`, `Stage4_패키지.md`, `한국기계_Stage4.md`)
- raw: 날짜 + 이벤트 (`2026-05-XX_한국기계_Stage4_미팅.md`)
- thoughts: 날짜 + 주제 (`2026-05-XX_K-POP_매출패턴.md`)

### 외부 공개 안전
- 민감 개인 정보 노출 금지
- 회사명 마스킹 룰 (위시캣 정책) 준수

## Claude 작업 가이드

### "AI FanStick 영업 한 일 정리해줘"
1. raw/에 오늘 날짜 노트 신규
2. 사용자 입력 → 구조화 (고객·이슈·다음 미팅·의사결정자)
3. entities/AI_FanStick.md 갱신
4. log.md 한 줄 추가

### "Stage 4 한국기계 미팅 결과"
1. entities/한국기계_Stage4.md 신규 또는 갱신
2. raw/2026-05-XX_한국기계_Stage4_미팅.md 신규
3. entities/AI_FanStick.md 또는 Stage4_패키지.md "영업 진행 상태" 갱신
4. log.md 한 줄 추가

### "K-POP 시장 분석"
1. entities/K-POP_시장.md 신규 (없으면)
2. thoughts/ 시장 인사이트 신규
3. entities/AI_FanStick.md "시장" 섹션 갱신

### "사용자가 다른 영역 작업 요청 시 (위시캣·강사양성 등)"
- "이 작업은 본 vault scope가 아닙니다. [정확한 위치]에 처리하시는 게 맞습니다." 안내
- 본 vault에 잘못 추가하지 않음

### "검증 결과 받음 (onDevice_AI Phase X 완료)"
1. entities/AI_FanStick.md "기술 근거" 갱신 (실측 데이터)
2. entities/Stage4_패키지.md 갱신 (영업 자료 반영)
3. log.md 한 줄 추가
4. 외부 영업 자료(영업/Stage4_OnDeviceAI_검토.md)도 갱신 알림

## cross-link

### onDevice_AI → uttecBizWiki
- Phase 1·2·3 검증 결과 → entities/AI_FanStick.md "기술 근거"
- 칩 변경 결정 → entities/AI_FanStick.md "차세대 BOM"
- microGPT 탑재 가능 → entities/Stage4_패키지.md (신설)

### myWiki → uttecBizWiki
- entities/ai-fanstick.md (제품 기술·특허) → entities/AI_FanStick.md (비즈니스)
- entities/uttec-stage-package.md (4.5-Stage 영업 모델) → entities/Stage4_패키지.md (Stage 4만)

### uttecBizWiki → onDevice_AI
- 영업 요구사항 (시장 피드백) → 다음 검증 사이클

## 메타

- 본격 진입: 2026-05-07
- scope 정정: 2026-05-07 (광범위 사업 운영 → onDevice AI 제품 전용)
- 첫 entity: AI FanStick (제품 1)
- archive 정책: onDevice AI 제품 라인이 살아있는 한 영구
