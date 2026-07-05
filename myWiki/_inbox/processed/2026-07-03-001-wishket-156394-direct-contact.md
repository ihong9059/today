---
id: 2026-07-03-001-wishket-156394-direct-contact
from: wishket-claude
to: mywiki-claude
type: request
priority: high
subject: 위시캣 직접 연락 강매칭 지원서 #156394 — 차량용 온도·GPS 수집 디바이스 HW/FW 개량+양산
created: 2026-07-03T21:31:58+0900
related: [wishketProject/위시캣/지원내용/2026-07/2026-07-03_프로젝트156394_지원내용.txt, wishketProject/second-brain/log.md]
status: done
---

# 위시캣 직접 연락 강매칭 지원서 #156394

## 변경 내용 (본 vault에서 한 일)
- 위시캣이 사용자에게 **직접 연락**한 건(#156394) 지원서 작성. 첨부 RFP(RFP-HWFW-001, 대외비 24p) 정독 후 요구사항 중심 완성.
- 대상: **차량용 온도·GPS 수집 디바이스 HW/FW 개량 개발 + 양산**. RS-232 타코미터 온도 수신 + GPS + BLE 실시간/저장이력 전송 + BLE OTA + 양산 이관.
- **매칭 강도 이례적**: nRF52 + BLE + 온도 = 본 팀 **nRF52832 BLE 온도 컨트롤러 국내 양산**과 사실상 동일 계열. RS-232(STM32F756 RS-485 Modbus KC), 현장 무선(일본 BLE Mesh 3,800대 24/7), 앱 연동(Android3+Flutter4), 양산·인증(KC/TELEC/CE), 네트워크(IoT Core/MQTT) 전 축 직결.
- GPS 자산: 자산 확인 SOP대로 사용자 1차 확인 → "직접 양산/개발 경험 있음" 확답 → 강점 확정.
- 목표: RFP상 "제안서는 사전 미팅 후 별도 제출" → **사전 미팅 성사** 중심. 구체 견적·요구사항 수용표는 NDA 후 이연.

## 영향
- **영업 자산 갱신 후보**: `myWiki/second-brain/entities/위시캣활동.md` 지원 이력에 #156394 추가 권고 (직접 연락 카테고리 = 신규 신호 유형).
- **차량용 IoT 디바이스 도메인**: 기존 entity에 없으면 신규 클라이언트 도메인 후보 (차량용 온도·GPS 텔레매틱스 개량).
- 진행 시 Tier 판단 대상: 개량+양산 규모 → 미팅 후 견적으로 Tier 정밀화 (초기 추정 Tier 2~3 후보).

## 후속 액션 (mywiki-claude)
- `위시캣활동.md` 지원 이력 테이블에 항목 추가: 2026-07-03 / #156394 / 차량용 온도·GPS 수집 디바이스 HW/FW 개량+양산 / 직접 연락 강매칭 / 상태 대기.
- 사용자 사이트 제출 → 사전 미팅 제안 도달 시 cross-vault revenue-pipeline 박제 검토.
- (선택) 차량용 텔레매틱스 개량 도메인 entity 신설 판단.
