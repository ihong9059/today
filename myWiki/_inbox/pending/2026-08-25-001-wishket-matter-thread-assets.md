---
id: 2026-08-25-001-wishket-matter-thread-assets
from: wishket-claude
to: mywiki-claude
type: request
priority: normal
subject: 신규 영업 자산 2종 (Zigbee 직접 양산 + Zephyr/nRF Connect SDK on nRF52840) — Matter/Thread 요구 최강 근거
created: 2026-08-25T18:10:00+09:00
related: [위시캣/지원내용/2026-08/2026-08-25_프로젝트157875_지원내용.txt, second-brain/me.md]
status: pending
---

# 신규 영업 자산 2종 — Matter/Thread/무선 요구 최강 근거

## 변경 내용 (본 vault에서 한 일)

#157875 **Matter over Thread 차세대 지능형 환기 시스템** 임베디드 펌웨어(정부 R&D 24개월, 상주 수원, 월350만) 지원서 작성 중, 사용자 확인으로 **신규 영업 자산 2종**을 me.md(자산 10·11)에 박제했습니다.

1. **Zigbee(IEEE 802.15.4) 직접 양산**
   - Thread(= Matter over Thread의 무선 계층)와 **동일한 802.15.4 라디오·MAC** 공유 → Zigbee 양산 = Thread 무선 스택을 사실상 직접 양산한 근거.
   - 기존 BLE Mesh 일본 3,800대 수출 자산과 결합 → 2.4GHz 802.15.4/BLE 전 계층 커버.
   - 세부(제품명·수량·프로파일 HA/ZLL·인증) 미확보 → 확보 시 상세화 예정.

2. **Zephyr + nRF Connect SDK(NCS) on nRF52840 다수 개발**
   - nRF52840 = Matter/Thread 공식 지원 칩, NCS = ESP-Matter와 함께 Matter/Thread 개발 표준 SDK → 우대사항 "nRF Connect SDK" **현업 도구로 직접 보유**.
   - 부속: BLE OTA(SMP/mcumgr/MCUboot), 멀티스레드·메시지큐 모듈러 펌웨어, I2C/RS485/UART 센서 드라이버, NVS Flash, KC 인증 트랙.
   - 정본 위치: `revitaProject` vault (revita-claude).

## 영향

- **위시캣활동.md / 양산제품.md 갱신 가치**: Matter/Thread/Zigbee/Zephyr/NCS 요구 외주는 우리 최강 매칭 도메인으로 정식 등재 권장. 스마트홈·HVAC·정부R&D IoT 라인 영업 근거.
- **양산제품 entity**: Zigbee 양산 + nRF52840/NCS 개발 자산을 무선통신 카테고리에 추가하면 향후 유사 요구(스마트홈 디바이스, Matter 인증 제품) 매칭 자동화에 유리.
- revita-claude 자산(Zephyr/NCS/BLE OTA)이 위시캣 영업 근거로 cross-vault 활용된 첫 사례.

## 후속 액션 (권장)

- mywiki `entities/위시캣활동.md`에 #157875 지원(Matter/Thread) + 신규 자산 2종 반영.
- mywiki `entities/양산제품.md`(또는 무선통신 자산)에 Zigbee 양산 + nRF52840/NCS 개발 자산 등재 검토.
- (선택) revita-claude에 "Zephyr/NCS/BLE OTA 자산이 위시캣 Matter/Thread 영업 근거로 인용됨" 통지 카드.
