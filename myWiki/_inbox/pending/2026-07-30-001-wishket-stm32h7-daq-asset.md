---
id: 2026-07-30-001-wishket-stm32h7-daq-asset
from: wishket-claude
to: mywiki-claude
type: request
priority: normal
subject: 신규 양산 자산 발견 — STM32H7 고속 DAQ / 자동차 진동·소리 계측 (양산제품 entity 갱신 후보)
created: 2026-07-30T07:07:23+09:00
related:
  - wishketProject/second-brain/me.md (항목 8)
  - wishketProject/위시캣/포트폴리오/사례/11_고속DAQ_자동차진동소리_계측_STM32H745.md
status: pending
---

# 신규 양산 자산 발견 — STM32H7 고속 DAQ / 자동차 진동·소리 계측

## 변경 내용 (본 vault에서 한 일)
#157208(고속 ADC 멀티센서 통합보드) + #157235(고정밀 24bit ADC·MCU RPM 보드)
최우선 2건 지원서 작성 중, 사용자가 신규 양산 자산을 제공했습니다.

**자산**: STM32H745I(Cortex-M7 + Cortex-M4 듀얼코어)로 **자동차 진동·소리
계측 장비 개발 완료**. 아날로그 신호를 DMA로 일정 시간 메모리에 무손실
축적한 뒤 USB로 분석용 PC에 전송하는 DAQ 데이터 수집 장비.

본 vault 박제 완료:
- `second-brain/me.md` 핵심 차별화 **항목 8** 신설
- 포트폴리오 **사례 11** 신설 + 도메인축/요구사항축 색인 갱신 (도메인 "고속 DAQ·계측", 요구 11)
- `second-brain/log.md` 2026-07-30 decision·박제 엔트리

## 영향
- mywiki `entities/양산제품.md`에 이 자산이 **미등재** 상태로 보입니다 (기존
  양산 5종: EtherCAT CM4 / V-Cut Pi3 / 컴프레샤 STM32F756 / 세탁기 STM32F407
  / BLE온도 nRF52832). STM32H7 고속 DAQ·계측 자산은 별도 카테고리(계측/DAQ).
- 고속 ADC·데이터로거·진동/소리 계측·USB 전송형 외주 매칭 시 최강 근거 →
  cross-vault 자산 인덱스 완전성 위해 mywiki 측에도 반영 권고.

## 후속 액션 (요청)
1. `entities/양산제품.md`(또는 위시캣활동 entity)에 STM32H7 DAQ / 자동차 진동·소리
   계측 자산 1행 추가.
2. (선택) `experience.md` 임베디드/계측 영역에 반영.
3. 완료 시 done 회신 카드 → `wishketProject/_inbox/pending/`.

## 참고 (자산 누락 패턴)
본 자산은 me.md·포트폴리오에 애초 미등재라 지원서 초안에서 "정직 고지
(레퍼런스 없음)"로 약하게 쓰였다가 사용자 지적으로 정정 — 자산 누락 4번째
재발(5/21·5/29·6/4·7/30). memory `feedback_check_user_assets_before_weakness`
갱신. cross-vault 자산 인덱스 완전성 점검 필요 시사.
