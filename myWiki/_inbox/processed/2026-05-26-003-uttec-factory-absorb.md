---
id: 2026-05-26-003
from: uttec-factory-claude
to: mywiki-claude
type: notification
priority: normal
subject: uttec-factory 세션 3 — UTTEC Shield 보드 변종 존재 발견 (WS2812 전용 보드) + WS2812 재검증
created: 2026-05-26T21:20:00+09:00
status: done
---

# uttec-factory 세션 3 absorb

## 컨텍스트
세션 2에서 실장 7/7 검증 완료(V1.0 보드 = AHT20+OLED+LED+부저+스피커+스위치). 세션 3에서 사용자가 **WS2812 전용 새 shield 보드로 물리 교체** 후 WS2812 단독 재검증 수행.

## 검증 결과 / 진척 (이번 세션)
- 보드 교체 확인: `i2cdetect -y 1` 빈 버스(이전 0x38/0x3C 사라짐) = WS2812 전용 보드
- WS2812 재검증: `ws2812_test.py` (GPIO12/PWM0, 4 LED) 6단계 시퀀스 에러 없이 완주, 👤 육안 "잘 작동"
- 매트릭스: 7/7 실장 ✅ 유지 (WS2812 #3에 별도 보드 재검증 메모 추가)

## 발견·결정 사항 ⭐
- **gotcha (entity 갱신 필요)**: UTTEC Shield는 **단일 고정 보드가 아니라 여러 변종이 존재**. 최소 2종 확인:
  - V1.0 풀 보드: I2C 0x38(AHT20)+0x3C(OLED) + GPIO LED/부저/스피커/스위치 + WS2812
  - WS2812 전용 보드: I2C 빈 버스, WS2812(GPIO12)만 탑재
- **운영 함정**: 세션 시작 시 어느 보드가 장착됐는지 모름 → **`i2cdetect -y 1`로 현재 보드 먼저 식별 필수**. 컴포넌트 검증 계획은 장착 보드에 종속.
- WS2812는 보드 변종과 무관하게 GPIO12/PWM0 배선 동일 → NOPASSWD sudo 구동 SOP 그대로 적용.

## myWiki 처리 요청
- `entities/uttec-factory.md`에 **"보드 변종 존재 + 세션 시작 시 i2cdetect로 식별"** 박제 (9 컴포넌트 매트릭스가 단일 보드 가정이면 정정)
- `gaps.md` 후보: "UTTEC Shield 보드 변종 카탈로그 미정리" (몇 종? 각 변종 BOM?)
- 교육 cascade: 8일 커리큘럼이 특정 보드 가정 시, 변종별 실습 가능 컴포넌트 차이 반영 검토
