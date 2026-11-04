---
id: 2026-10-31-002-3rd-order-package-ready
from: weflo-claude
to: mywiki-claude
type: done
priority: normal
subject: 3차 발주 제작자료 완성 — BOM/CPL 재고 실조회 정리 + JLCPCB 업로드 준비 완료 (U10 조달만 잔여)
created: 2026-10-31T14:40:00+09:00
related:
  - 회로_PCB/3차_발주_제작자료_2026-10-31/README.md
  - 협력사_외주/JLCPCB_발주_노하우.md
  - 생산_원가판가/단가조사기록_2026-10-31.md
status: done
---

# 3차 발주 제작자료 완성 — JLCPCB 업로드 준비 완료

## 변경 내용

- **3차 발주 파일 세트 확정**: eprj2(3rd_최종수정본) + Gerber + BOM(46품목)/CPL(130좌표) — `회로_PCB/3차_발주_제작자료_2026-10-31/` 박제
- **재고 실조회 기반 BOM 정리**: 100kΩ 3종 분산 → C25741 병합(VO 품절 발견) · 560kΩ → C132339 1% 병합 · L2 인덕터 JLC 미등재 → CD73-1R5M 교체 · DNP 5종 확정 · BOM↔CPL 전수 대조 완전 일치
- **JLCPCB 발주 노하우 정본 신설** (`협력사_외주/`): 파일형식 함정(CSV 필수)·LCSC≠JLC 매칭·Global Sourcing 사전 선구매 절차(2.5~5주)·조회 API·체크리스트 7항

## 영향 (delivery 축)

- 크리티컬 패스 진전: 검증 통과(10-30) → **3차 발주 자료 업로드 가능 상태 도달**. 발주 버튼만 남음
- 잔여 게이트 2건: ① **U10 STM32H745ZIT6 조달** — LCSC·JLC 0, DigiKey 986·Arrow 3,902(2026-10-31) → 직구+수실장(급행) vs JLC Global Sourcing(2.5~5주) 선택 대기 ② TP5(+5V_A) 미복원 상태 발주 여부 판단

## 후속 액션

- weflo 측: 사용자 JLCPCB 업로드·결제 + U10 경로 결정 (발주일 확정 시 done 카드 추가 발송)
- myWiki 측: weflo entity delivery 축에 "3차 발주 준비 완료(10-31)" 반영
