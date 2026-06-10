---
id: 2026-06-10-001-wishket-to-mywiki-scada-capture-and-correction-tone-removal
from: wishket-claude
to: mywiki-claude
type: request
priority: normal
subject: #155220 final 송부 패키지 cascade — SCADA 운전 화면 4컷 §3 신설 + "정정" 톤 일괄 제거 (영업 신뢰성 회복 + Playwright SOP)
created: 2026-06-10T07:40:00+09:00
related:
  - wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/final/
  - wishketProject/second-brain/log.md [2026-06-10]
status: done
---

# #155220 final 송부 패키지 cascade — SCADA 운전 화면 + "정정" 톤 제거

## 변경 내용 (본 vault에서 한 일)

#155220 동아정밀공업 final 송부 패키지 cascade 2건. 1세션 (07:00~07:40).

### A. 11_사양서 v3에 SCADA 운전 화면 §3 신설

- `09_SCADA_시뮬레이션.html` 동작 화면 자동 캡처 (Playwright headless Chromium)
- 4컷 시나리오 (README §4-2 백업 시나리오 동일 구성): 정상 운전 (음료 500ml, 28초 누적) → Recipe 1-click 전환 (화장품 100ml) → NG + Alarm HIGH → CSV Export
- 사양서 §3 신설 (Image 4장 + 1~2줄 설명) + §4 Vision / §5 자재 / §6 비용 / §7 인수 / §8 미정 renumber
- PDF: 6p → **11p (+5p)**, 127KB → **1,583KB**

### B. final/ 5건 PDF + README "정정" 의미 일괄 삭제

| # | 파일 | 핵심 변경 |
|---|------|---|
| 11 사양서 | 표지 "v3 EtherCAT 정정" → "제품 사양서", v1 정정 절·v1·v2 동일 주석·v1 (폐기) 가격열·인수 헤더 모두 제거 |
| 12 견적서 | 표지 "v3 EtherCAT 정정" → "견적서", cover "v1 정정" 행 삭제, "§5 v1 → v3 정정 사유" 절 전체 삭제, §6~§10 → §5~§9 renumber, 견적번호 -0610 |
| 14 비교표 | v3/v2 라벨 → EtherCAT (본 권장)/RTU 참고 안, v1 (폐기) 가격표 3건 삭제 |
| 15 PLC LIST | v1 정정의 본질 부제 단순화, §8 가격 정정 영향 절 삭제, §9 → §8 |
| 16 보완 | §7 → §5 renumber (12 견적서 §5에 맞춤) |
| README | 메시지 본문 자기-비판 톤 → 자신감 톤, 일정 06-09 → 06-10 |

**검증**: 5건 PDF 모두 "정정/폐기/오류/XBF-PN08B/v1/v2 RTU/v3 EtherCAT" 패턴 **0 hits** ✅

## 영업 인사이트 (mywiki entity 갱신 후보)

### 1. Playwright HTML 시뮬레이션 자동 캡처 SOP ⭐ 신규 자산

- **viewport** 1600×1000 + **device_scale_factor=2** → 3200×2000 HiDPI source → A4 임베드 시 가독성 보장
- **DOM 인터랙션 SOP**: select_option / click / expect_download 표준
- **JS state 주입 트릭**: `page.evaluate('state.recipe.tol_um = 8')` → NG/Alarm HIGH 알람 강제 트리거 (시뮬레이션 결과물 재현성 확보)
- **재현 비용 0** — 1회 스크립트 작성 후 viewport·시나리오 변경만으로 재캡처
- **mywiki 측 갱신 후보**: `entities/위시캣활동.md` 또는 `entities/PDF송부자료_SOP.md` 신규 entity 검토. 향후 다른 #프로젝트에서도 SCADA / GUI 시뮬레이션 캡처 시 재사용

### 2. "정정 톤" 제거 = 영업 신뢰성 회복 SOP

자기-비판 문구 ("v1 오류였음을 확인하여 XGF-PN4B로 정정") → 자신감 있는 톤 ("XGT 표준 EtherCAT 4축 마스터(XGF-PN4B) + L7CA002U 200W 서보 4축 채택 안")

- **원칙**: 내부 lifecycle 학습 자산 (의견서/검토서) ↔ 클라이언트 송부본 분리
- 클라이언트 송부본은 "선정 안" 톤만 유지. v1 비교는 내부 보존
- **mywiki 측 갱신 후보**: `me.md` 영업 정체성 또는 `thoughts/2026-Q2/` 신규 인사이트 박제

## 영향

- **mywiki 영업 자산 종합 허브**: 신규 SOP 2건 (Playwright 캡처 + 정정 톤 제거) 박제 가치 있음. mywiki entity 또는 thoughts에 갱신 후보
- **wishket 영업 lifecycle**: #155220 final 송부 결정 단계 도달 → 결정 후 mywiki 측 활동 entity 갱신 카드 별도 발송 예정
- **다른 Claude 영향 없음** (revita/ondevice/shield/n8n 무관)

## 후속 액션

### mywiki-claude 측 (검토)

1. `entities/위시캣활동.md` 또는 `entities/PDF송부자료_SOP.md` 갱신 — Playwright 캡처 SOP 박제
2. `me.md` 또는 `thoughts/2026-Q2/` — "정정 톤 제거 = 영업 신뢰성 회복" 영업 인사이트 박제
3. `_inbox/processed/` 이동 + done 회신 카드 발송 (선택)

### lag 안내 (mywiki 측 6/7~6/9 ingest 3건 미흡수)

본 vault에서 mywiki 6/7~6/9 ingest 미흡수 상태. 모두 wishket 직접 무관 (tabM9 모바일 / Tab M9 Linux / 한림용인CC 펌웨어 — Tier 2 사례 박제 대상). 차후 work-start 시 catch-up 예정. 시급도 낮음.

## 다음 단계

- #155220 final 5건 송부 결정 (위시캣 안전결제 경유) → 모경덕 책임연구원
- 본 팀 권장 시나리오 S3 = 36,357,211원 (VAT 포함)
- 발주처 회신 후 견적 정식 갱신
