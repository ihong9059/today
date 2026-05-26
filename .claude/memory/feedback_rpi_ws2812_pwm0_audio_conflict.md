---
name: RPi WS2812 + audio PWM0 충돌 ⭐
description: GPIO12(PWM0)에 WS2812 연결 시 onboard audio가 PWM0을 점유해 신호 가로채임. dtparam=audio=on 비활성화 + 재부팅이 표준 해결
type: feedback
originSessionId: c7cf365f-2192-44f5-8119-601af6608c97
---
RPi(특히 RPi 3/4)에서 GPIO12 또는 GPIO18(PWM0 채널)에 WS2812 데이터 라인을 연결하고 rpi-ws281x로 제어할 때 `dtparam=audio=on`이 활성화되어 있으면 onboard audio driver(`snd_bcm2835`)가 PWM0을 점유한다. 라이브러리 `init()` + `show()`는 에러 없이 통과하지만 LED는 무동작.

**Why**: 2026-05-26 UTTEC Shield(GPIO12, 4 WS2812) 첫 테스트에서 동일 함정 발생. DRY RUN init OK였지만 LED 무점등. `lsmod | grep snd_bcm2835`로 audio driver 적재 확인 → audio dtparam 비활성화 + reboot 후 즉시 정상.

**How to apply**:
- GPIO12/18에 WS2812 연결한 RPi에서 첫 점등 시도가 무동작이면 즉시 다음 확인:
  - `grep '^dtparam=audio' /boot/firmware/config.txt`
  - `lsmod | grep snd_bcm2835`
- 둘 중 하나라도 양성이면 `sudo sed -i.bak 's/^dtparam=audio=on/#dtparam=audio=on/' /boot/firmware/config.txt && sudo reboot`
- 백업은 `config.txt.bak`에 자동 저장 (audio 복귀 필요 시 사용)
- 부저(능동, 단순 GPIO)는 영향 없음. 스피커가 hardware PWM 필요하면 software PWM(`gpiozero PWMLED`)로 우회 가능
- 회피 옵션(데이터 핀 변경 가능 시): GPIO13/19(PWM1) → rpi-ws281x `LED_CHANNEL=1`. 단 보드 데이터 핀이 고정되면 audio off가 유일
