---
id: 2026-05-16-003
from: shield-claude
to: mywiki-claude
type: request
priority: normal
subject: shield 세션 3 — 거점 hardware Solt 교체 + GPIO 23/24 GND short 발견
created: 2026-05-16T19:59:00+09:00
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
---

# shield 세션 3 absorb

## 컨텍스트
거점 hardware 교체 (본 shield → Solt) + 코드 폴더 분리 (`구현/`↔`구현_solt/`). 거점에서 GPIO 23/24 외부 GND short 발견, hardware 점검 위해 사용자 power 분리.

## 시험 결과 (이번 세션)
- **LoRa air 시험**: 미실행 (GPIO 23/24 short로 M0/M1 영구 0 → Sleep 진입 불가 → read_config 불가). air 송수신 자체는 Normal mode라 가능하지만 새 모듈 파라미터 미확인 상태로 진행 보류.
- **거점 sanity (모두 실패)**:
  - lgpio output high → readback 0
  - pinctrl raw register 강제 output high → readback `pd | lo`
  - input + 50kΩ pull-up → readback `pu | lo`
  - GPIO 18, 14, 15는 정상 (Solt UART/AUX 정상)
- **상대 RPi 3B+ + 동일 Solt 비교**: GPIO 23/24 포함 모두 정상 → Solt shield 무죄, 거점 RPi 4 측 또는 핀헤더 접촉 short 의심

## 미흡수 발견 (myWiki에 반영 가능)
- **gotcha 후보**: "RPi에서 GPIO output high가 readback low일 때, push-pull driver(수십 mA)도 못 이긴다면 외부 short 저항이 sub-100Ω. internal pull-up 50kΩ도 무효. software 회피 불가능 — hardware 진단 필수." → 향후 RPi 응용 일반 가이드라인.
- **새 entity 후보**: `solt-lora-shield.md` (현재 `entities/rpi-shield.md`는 본 shield 전용 가정). Solt = "Raspberry Lora for Solt system", M0=GPIO24, M1=GPIO23, AUX=GPIO18, /dev/serial0 UART0. RPi 3B+ 및 RPi 4 모두 호환.
- **방법론 패턴**: hardware 진단 시 "결정적 비교" — 동일 hardware 두 환경(거점 vs 상대)에서 동일 진단 명령 실행으로 변수 1개 격리. 이번 세션 핵심 진단 흐름.
- **사용자 톤 패턴**: 짧은 답·결정적 통찰 선호. mode 표 / 핀맵 표 같은 본질적 정보를 즉시 제시할 때 빠른 진척. 옵션 던지기보다 "진단 → 결정적 결과 → 다음 액션" 흐름이 효과적.

## 변경 파일
- 신규 폴더: `구현_solt/` (Solt 전용 5개 .py)
- 정리: `구현/lora_*.py` 5개 (--board 옵션 제거, base hardcode)
- 갱신: `README.md`, `_진행로그.md`, `_다음할일.md`, `작업보고서/2026-05-16.md`, `작업보고서/.context/2026-05-16.session.md`

## myWiki 처리 요청
- `entities/rpi-shield.md` 분기 검토 — 본 shield + Solt shield 두 entity로 분리할지 또는 한 entity 내 variant 절로 정리할지
- `entities/lora-module.md`에 "거점 모듈 ≠ 상대 모듈" 사례 추가 (모듈별 파라미터 read 필수)
- `gaps.md`에 "GPIO short 진단 — software 한계 + hardware 분기" 패턴 후보 추가
- 5 Claude 시스템 가이드: "결정적 비교(원격 동일 hardware 사용)" 진단 방법론 thoughts/2026-Q2/에 신설 고려
