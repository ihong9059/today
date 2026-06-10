---
title: 위시캣 영업 — 정정 톤 제거 = 신뢰성 회복 + Playwright HTML 캡처 SOP
type: thought
created: 2026-06-10
updated: 2026-06-10
tags: [위시캣, 영업신뢰성, 정정톤제거, 송부본분리, Playwright, HTML캡처, SCADA, 동아정밀, LS-XGT, 견적검증, 사외경험자검토]
links: [위시캣활동, strengths, ai-direction, gaps, 영업전략, me]
---

# 위시캣 영업 — 정정 톤 제거 = 신뢰성 회복 + Playwright HTML 캡처 SOP

wishket-claude 4 카드 megasession 흡수(#2026-06-06-002/003/007 + #2026-06-10-001)에서 도출된 **영업 신뢰성 인사이트 2건**.

## [사실 A] + [사실 B] → [판단 C]

- **사실 A**: #155220 견적 v1 (XGK + XBF-PN08B)이 사외 경험자 검토에서 결정적 오류로 판명. 정정 과정에서 의견서·검토서에 "v1 오류였음을 확인하여 XGF-PN4B로 정정"이라는 **자기-비판 문구**가 다수 생성됨.
- **사실 B**: 그 문구가 클라이언트 송부본(final 5건 PDF + README)에 그대로 남아 있었음. 6/10 작업에서 5건 PDF 전체의 "정정/폐기/오류/XBF-PN08B/v1/v2 RTU" 패턴을 **0 hits로 일괄 제거**.

→ **판단 C — 내부 학습 자산 ↔ 클라이언트 송부본 분리 원칙**:
정정 이력은 본 팀의 lifecycle 학습 자산으로 **내부 보존**한다(의견서·검토서·이중설계 검토서). 그러나 클라이언트가 받는 송부본은 "선정 안" 자신감 톤만 유지한다. "v1 오류 정정" → "XGT 표준 EtherCAT 4축 마스터(XGF-PN4B) + L7CA002U 200W 서보 4축 채택 안". **자기-비판 문구 노출 = 영업 신뢰성 직접 훼손**. 1억급 견적일수록 "PLC 누가 구성했나" 의심을 부르는 흔적은 송부본에서 제거.

이 원칙은 [[gaps]] § LS XGT prefix gotcha(작성 단계 검증) → [[ai-direction]] § 결정 39 확장(사외 경험자 검토 의무) → 본 thought(송부 단계 톤 분리)로 **3단 방어선**을 이룬다.

## Playwright HTML 시뮬레이션 캡처 SOP (신규 영업 자산)

SCADA 운전 화면을 사양서에 임베드하기 위해 `09_SCADA_시뮬레이션.html`을 headless Chromium으로 자동 캡처:

- **HiDPI source**: viewport 1600×1000 + `device_scale_factor=2` → 3200×2000 → A4 임베드 시 가독성 보장
- **DOM 인터랙션 SOP**: `select_option` / `click` / `expect_download` 표준으로 4컷 시나리오 재현 (정상 운전 → Recipe 1-click 전환 → NG + Alarm HIGH → CSV Export)
- **JS state 주입 트릭**: `page.evaluate('state.recipe.tol_um = 8')` → NG/Alarm HIGH 강제 트리거 (시뮬레이션 결과물 재현성 확보)
- **재현 비용 0**: 1회 스크립트 작성 후 viewport·시나리오 변경만으로 재캡처

→ 사양서 PDF 6p→11p(127KB→1,583KB). 향후 다른 #프로젝트의 SCADA/GUI 시뮬레이션 캡처에 그대로 재사용. [[strengths]] § 17.

## [행동 변화 D]

1. 위시캣 견적·사양서 작성 시 **사외 경험자 검토 1회**를 SOP 4단계에 의무 편입 (결정 39 확장).
2. final 송부 직전 **"정정/폐기/오류" 패턴 grep 0 hits 검증**을 송부 체크리스트에 추가.
3. SCADA/HTML 시뮬레이션이 있는 모든 프로젝트는 Playwright 캡처로 사양서 시각 자산을 즉시 생성.

## 관련

- [[위시캣활동]] § 2026-06-06~06-10 흡수 (#155220 v1→v3→final→SCADA 진화)
- [[strengths]] § 17 위시캣 영업 자산 7종
- [[ai-direction]] § 결정 39 확장 (영업 신뢰성 3 원칙)
- [[gaps]] § LS XGT prefix gotcha
