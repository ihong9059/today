# Jetson Nano eMMC 부팅 복구 가이드

**작성일:** 2026-01-26
**상태:** 🚨 긴급 - 부팅 불가

---

## 문제 요약

| 항목 | 내용 |
|:-----|:-----|
| 장비 | Jetson Nano (Yahboom 보드) |
| IP | 192.168.1.11 |
| 사용자/비밀번호 | uttec / uttec |
| 부팅 미디어 | **eMMC** (SD 카드 아님) |
| 증상 | NVIDIA 로고에서 멈추고 부팅 안됨 |

---

## 원인

`/boot/extlinux/extlinux.conf` 파일에 잘못된 Device Tree 오버레이 추가

### 문제가 된 수정 내용:
```diff
 LABEL primary
       MENU LABEL primary kernel
       LINUX /boot/Image
       INITRD /boot/initrd
+      FDT /boot/dtb/tegra210-p3448-0000-p3449-0000-b00.dtb
+      FDTOVERLAYS /boot/tegra210-p3448-0000-p3449-0000-a02-hdr40.dtbo
       APPEND ${cbootargs} quiet root=/dev/mmcblk0p1 rw rootwait ...
```

### 백업 파일 위치:
```
/boot/extlinux/extlinux.conf.backup  (정상 설정)
```

---

## 원인 분석 및 반성

### 실수 내역
| 문제 | 설명 |
|:-----|:-----|
| **버전 불일치** | FDT에 `b00.dtb` 사용, 오버레이에 `a02-hdr40.dtbo` 사용 → 호환 안됨 |
| **보드 확인 안함** | Yahboom 보드의 정확한 하드웨어 리비전 확인 없이 진행 |
| **DTB 파일 존재 확인 안함** | 파일 경로가 실제 존재하는지 확인 안함 |
| **eMMC 위험성 간과** | SD카드와 달리 eMMC는 복구가 어려운데 충분히 주의하지 않음 |

### 해야 했던 것 (사전 확인)
```bash
# 보드 리비전 확인
cat /proc/device-tree/nvidia,dtsfilename

# 사용 가능한 DTB 파일 확인
ls /boot/dtb/

# 현재 사용 중인 DTB 확인
dmesg | grep -i dtb
```

### 근본 원인
SPI 핀 활성화를 위해 급하게 Device Tree를 수정 → 검증 없이 적용 → 부팅 실패

### 교훈
1. 부팅 설정 수정 전 반드시 백업 및 **검증**
2. eMMC 시스템은 특히 **신중하게** 작업
3. 보드 리비전과 DTB **호환성 먼저 확인**
4. **급하게 진행하지 않기**

---

## 복구 방법 1: 시리얼 콘솔 (권장)

### 필요 장비
- USB-TTL 시리얼 어댑터 (3.3V)
- 또는 Jetson의 Micro USB 포트 + Mac

### Mac에서 연결

```bash
# 1. 시리얼 포트 확인
ls /dev/tty.usb* /dev/cu.usb*

# 2. 시리얼 접속
screen /dev/cu.usbserial-XXXXX 115200
# 또는
screen /dev/tty.usbmodem* 115200
```

### 복구 절차

1. **Jetson 전원 끄기**

2. **시리얼 케이블 연결**
   - Jetson UART TX → USB-TTL RX
   - Jetson UART RX → USB-TTL TX
   - Jetson GND → USB-TTL GND

3. **Mac에서 screen 접속 후 Jetson 전원 켜기**

4. **부팅 중 아무 키나 빠르게 연속 입력** → U-Boot 프롬프트 진입

5. **U-Boot 프롬프트에서 (복구):**

```bash
# 환경 변수 확인
printenv

# 단일 사용자 모드로 부팅
setenv bootargs "root=/dev/mmcblk0p1 rw rootwait init=/bin/bash"
boot
```

6. **쉘 진입 후 파일 복구:**

```bash
# 파일시스템 읽기/쓰기 마운트
mount -o remount,rw /

# 백업 파일로 복원
cp /boot/extlinux/extlinux.conf.backup /boot/extlinux/extlinux.conf

# 동기화 및 재부팅
sync
reboot -f
```

---

## 복구 방법 2: SD 카드 부팅

### 필요 장비
- 16GB 이상 microSD 카드
- Jetson Nano SD 카드 이미지

### 절차

1. **SD 카드 이미지 다운로드**
   - URL: https://developer.nvidia.com/embedded/downloads
   - 파일: `jetson-nano-sd-card-image`

2. **Balena Etcher로 SD 카드에 이미지 플래시**

3. **SD 카드를 Jetson에 삽입 후 부팅**
   - Jetson은 SD 카드가 있으면 SD에서 먼저 부팅 시도

4. **SD 카드 Ubuntu에서 eMMC 수정:**

```bash
# eMMC 파티션 확인
lsblk
# mmcblk0p1이 eMMC의 rootfs

# eMMC 마운트
sudo mkdir -p /mnt/emmc
sudo mount /dev/mmcblk0p1 /mnt/emmc

# 설정 파일 복구
sudo cp /mnt/emmc/boot/extlinux/extlinux.conf.backup \
        /mnt/emmc/boot/extlinux/extlinux.conf

# 확인
cat /mnt/emmc/boot/extlinux/extlinux.conf

# 마운트 해제
sudo umount /mnt/emmc

# 전원 끄고 SD 카드 제거 후 다시 부팅
sudo poweroff
```

---

## 복구 방법 3: Force Recovery 모드

### 최후의 수단 (데이터 손실 가능성 있음)

1. **Jetson 전원 끄기**

2. **FC REC 핀 단락**
   - FC REC (Force Recovery) 버튼 누른 상태로 전원 켜기
   - 또는 FC REC 핀과 GND 점퍼

3. **USB 케이블로 Mac 연결**

4. **Mac에서 확인:**
```bash
# lsusb 설치 (없으면)
brew install lsusb

# NVIDIA 장치 확인
lsusb | grep -i nvidia
# "NVIDIA Corp." 표시되면 복구 모드 성공
```

5. **NVIDIA SDK Manager 사용** (Linux PC 필요)
   - SDK Manager로 시스템 재플래시
   - ⚠️ 주의: 데이터 손실 가능

---

## 정상 extlinux.conf 내용

```
TIMEOUT 30
DEFAULT primary

MENU TITLE L4T boot options

LABEL primary
      MENU LABEL primary kernel
      LINUX /boot/Image
      INITRD /boot/initrd
      APPEND ${cbootargs} quiet root=/dev/mmcblk0p1 rw rootwait rootfstype=ext4 console=ttyS0,115200n8 console=tty0 fbcon=map:0 net.ifnames=0 sdhci_tegra.en_boot_part_access=1
```

---

## 복구 후 확인 사항

### 1. SSH 접속 테스트
```bash
ssh uttec@192.168.1.11
# 비밀번호: uttec
```

### 2. 서비스 상태 확인
```bash
sudo systemctl status web_monitor
sudo systemctl status sensor_web
```

### 3. AHT20 센서 테스트
```bash
python3 ~/sensor_web/app.py
```

### 4. 웹 접속 테스트
- 시스템 모니터: http://192.168.1.11/
- 센서 웹: http://192.168.1.11:8080/

---

## 로컬 백업 파일 위치 (Mac)

| 파일 | 위치 |
|:-----|:-----|
| web_monitor/app.py | `/Users/maeg/todo/today/jetson/web_monitor/` |
| sensor_web/app.py | `/Users/maeg/todo/today/jetson/sensor_web/` |
| led_web/app.py | `/Users/maeg/todo/today/jetson/led_web/` |
| ws2812_spi.py | `/Users/maeg/todo/today/jetson/led_web/` |

---

## WS2812 LED 작업 (복구 후 계속)

### 문제점
- Yahboom 보드에서 GPIO/SPI 핀이 기본적으로 비활성화
- 여러 방법 시도했으나 모두 실패

### 다음 시도할 것
1. Yahboom 공식 문서에서 GPIO 활성화 방법 확인
2. 레벨 시프터(74HCT125) 사용 검토
3. PWM 방식 시도 (`/sys/class/pwm/pwmchip0`)

---

## 연락처 및 참고

- Yahboom 공식 사이트: https://www.yahboom.com/
- NVIDIA Jetson 포럼: https://forums.developer.nvidia.com/c/agx-autonomous-machines/jetson-embedded-systems/
- Jetson Nano Pinout: https://jetsonhacks.com/nvidia-jetson-nano-j41-header-pinout/

---

*이 문서는 2026-01-26 Jetson Nano 부팅 실패 복구를 위해 작성됨*
