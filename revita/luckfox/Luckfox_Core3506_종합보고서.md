# Luckfox Core3506 종합 리서치 보고서

## 1. 기본 정보

### 제조사
- **Luckfox** (Waveshare를 통해 유통)
- 중국 기반 임베디드 리눅스 개발보드 전문 제조사

### SoC/프로세서 사양
- **SoC**: Rockchip **RK3506B** (22nm 공정)
- **CPU**: Triple-core ARM **Cortex-A7** (최대 **1.5GHz**) + 1x ARM **Cortex-M0** (200MHz, 실시간 제어용)
- **GPU**: 2D 하드웨어 가속 엔진 (3D GPU 없음, NPU 없음)
- **아키텍처**: 32-bit ARM
- **비디오 디코딩**: 720P 지원
- **오디오**: AEC (Acoustic Echo Cancellation), ANR (Automatic Noise Reduction) 알고리즘 내장

### RK3506 변형 칩 비교
| 변형 | 메모리 | 온도 범위 |
|------|--------|-----------|
| RK3506G2 | 내장 128MB DDR3L | 상용 (Commercial) |
| **RK3506B** | 외장 DDR3L (최대 1GB) | 상용 (Commercial) |
| RK3506J | 외장 DDR3L | 산업용 (Industrial) |

### 메모리 / 스토리지
- **RAM**: 512MB DDR3L (온보드)
- **Core3506-0800**: 기본 스토리지 없음 (SPI Flash / SD Card 사용)
- **Core3506-0808**: 8GB eMMC 내장

### 크기 / 가격
- **크기**: 32mm x 32mm (초소형 코어보드)
- **가격**: $55.99 ~ $65.99 USD (Waveshare, eMMC 유무에 따라 상이)
- **동작 온도**: -20 ~ 60°C

### 인터페이스
| 항목 | 사양 |
|------|------|
| 연결 방식 | 120핀 Stamp Hole (Castellated Holes) |
| 디스플레이 | MIPI DSI 2-lane (최대 1280x1280 @60fps) |
| USB | 2x USB OTG 2.0 |
| Ethernet | 2x 10/100M RMII |
| GPIO | 32개 Rockchip Matrix IO 핀 (98개 기능 시그널 멀티플렉싱) |
| 저속 인터페이스 | PWM, UART, I2C, SPI, I2S |
| 산업용 프로토콜 | RS-485, CAN Bus (Lyra Pi 보드 기준) |

---

## 2. Linux OS Porting

### 지원 OS
| OS | 지원 상태 | 비고 |
|----|-----------|------|
| **Buildroot** | 공식 지원 (Primary) | SDK 기본 빌드 시스템 |
| **Ubuntu 22.04** | 공식 지원 | SDK에서 직접 빌드 가능 |
| **Ubuntu 24.04** | 커뮤니티 지원 | markbirss/rk3506-ubuntu 프로젝트 |
| **Debian 12** | 부분 지원 | 커뮤니티 이미지 존재 |
| **RT-Thread 4.1** | 지원 | SMP 멀티코어, Cortex-M0 코어 |
| **RTOS** | 지원 | AMP 멀티시스템 (Linux + RTOS 동시 구동) |

### 커널 버전
- **Linux Kernel 6.1**

### 개발 환경 요구사항
- **OS**: Ubuntu 22.04 LTS x86_64 (유일하게 공식 지원)
- Docker 환경도 사용 가능

### 의존성 패키지 설치
```bash
sudo apt-get install git ssh make gcc libssl-dev liblz4-tool expect expect-dev \
  g++ patchelf cmake libgmp-dev libmpc-dev bison flex fakeroot \
  device-tree-compiler bzip2 curl python2 python3 qemu-user-static ncurses-dev
```

### SDK 다운로드 및 초기화
```bash
# Google Drive에서 SDK tar.gz 다운로드
tar -xzvf luckfox-lyra-XXXXXX.tar.gz
.repo/repo/repo sync -l
sudo ln -sf /usr/bin/python2 /usr/bin/python
```
- 다운로드 페이지: https://wiki.luckfox.com/Luckfox-Lyra/Download/
- SDK Google Drive: https://drive.google.com/drive/folders/1l2ixhfw53J3eZunyvHMnw2DYViH9d8Cx

### 빌드 명령어

**전체 빌드:**
```bash
./build.sh lunch    # 보드 선택 메뉴
./build.sh          # 전체 빌드 실행
```

**개별 컴포넌트 빌드:**
```bash
./build.sh uboot      # U-Boot -> MiniLoaderAll.bin, uboot.img
./build.sh kernel     # 커널 -> boot.img
./build.sh rootfs     # 루트 파일시스템 -> rootfs.img
./build.sh firmware   # 펌웨어 패키징 -> update.img
```

**커널 설정 (menuconfig):**
```bash
./build.sh lunch
./build.sh kernel-config
```

**Buildroot 커스텀 빌드:**
```bash
./build.sh lunch
./build.sh buildroot-config   # Buildroot menuconfig
./build.sh rootfs             # 루트 파일시스템 빌드
```

### U-Boot
- U-Boot v2017.09 기반
- 빌드: `./build.sh uboot`
- 출력: `MiniLoaderAll.bin` (SPL), `uboot.img`

### Device Tree
- **파일 위치**: `<SDK>/kernel-6.1/arch/arm/boot/dts/`
- **보드 설정**: `device/rockchip/rk3506/`
- **Buildroot defconfig**: `buildroot/configs/rockchip_rk3506_luckfox_defconfig`

| 모델 | DTS 파일 |
|------|----------|
| Luckfox Lyra | `rk3506g-luckfox-lyra-sd.dts` |
| Lyra Plus | `rk3506g-luckfox-lyra-plus.dts` |
| Lyra Ultra | `rk3506b-luckfox-lyra-ultra.dts` |
| Lyra Zero W | `rk3506b-luckfox-lyra-zero-w.dts` |
| **Lyra Pi** (Core3506) | `rk3506b-luckfox-lyra-pi.dts` |

### 이미지 플래싱

**부트 모드:**
- **Loader Mode** (권장): BOOT 버튼 누른 채 USB 연결 후 해제
- **MaskRom Mode** (복구용): FSPI_CLK/eMMC_CLK를 GND에 쇼트

**Windows:**
1. DriverAssistant v5.13+로 USB 드라이버 설치
2. RKDevTool v3.31에서 `update.img` 선택 -> Upgrade

**Linux:**
```bash
sudo ./rkflash.sh update
```

**출력 이미지 파일** (`rockdev/` 디렉토리):
- `MiniLoaderAll.bin`, `parameter.txt`, `uboot.img`, `boot.img`, `rootfs.img`, `update.img`

### 실시간 성능
- EtherCAT 버스 최적화 (지터 10% 이하)
- Preempt-RT 지연: ~62-70us
- Xenomai 지연: ~68us
- AMP 멀티시스템: Linux + RTOS 동시 구동 가능

---

## 3. 개발 리소스

### 공식 Wiki
| 페이지 | URL |
|--------|-----|
| Core3506 메인 | https://wiki.luckfox.com/Core3506/ |
| Core3506 소개 | https://wiki.luckfox.com/Core3506/Introduction/ |
| Core3506 핀아웃 | https://wiki.luckfox.com/Core3506/Pinout/ |
| Lyra RK3506 SDK | https://wiki.luckfox.com/Luckfox-Lyra/SDK/ |
| SDK 이미지 컴파일 | https://wiki.luckfox.com/Luckfox-Lyra/SDK-Image-Compilation/ |
| Buildroot 설정 | https://wiki.luckfox.com/Luckfox-Lyra/Buildroot-Configuration/ |
| Device Tree | https://wiki.luckfox.com/Luckfox-Lyra/Device-Tree/ |
| 커널 설정 | https://wiki.luckfox.com/Luckfox-Lyra/Kernel-Configuration/ |
| 이미지 플래싱 | https://wiki.luckfox.com/Luckfox-Lyra/Image-flashing/ |
| 다운로드 | https://wiki.luckfox.com/Luckfox-Lyra/Download/ |

### GitHub 리포지토리
| 리포지토리 | URL |
|-----------|-----|
| LuckfoxTECH (공식) | https://github.com/LuckfoxTECH |
| rk3506-ubuntu (커뮤니티) | https://github.com/markbirss/rk3506-ubuntu |
| luckfox-sdk-build | https://github.com/gourytch/luckfox-sdk-build |
| DMatern/LuckfoxLyra | https://github.com/DMatern/LuckfoxLyra |

### 커뮤니티
- **공식 포럼**: https://forums.luckfox.com
- **Lyra RK3506 섹션**: https://forums.luckfox.com/viewforum.php?f=17
- **AI 지원**: https://ai.luckfox.com/

### SSH 로그인 정보
- Username: `luckfox` / Password: `luckfox`

---

## 4. 경쟁 보드 비교

| 항목 | **Core3506** | **RPi Zero 2 W** | **ESP32** | **Luckfox Pico Ultra** |
|------|-------------|-------------------|-----------|----------------------|
| SoC | RK3506B (3xA7) | BCM2710A1 (4xA53) | Xtensa LX6 | RV1106 (A7+RISC-V) |
| 클럭 | 1.5GHz | 1.0GHz | 240MHz | 1.2GHz |
| RAM | 512MB | 512MB | 520KB | 256MB |
| NPU | 없음 | 없음 | 없음 | 0.5 TOPS |
| Ethernet | 2x 100Mbps | 없음 | 없음 | 100Mbps |
| 실시간 코어 | Cortex-M0 | 없음 | ULP | RISC-V MCU |
| 크기 | 32x32mm | 65x30mm | 다양 | 소형 |
| 가격 | ~$56-66 | ~$15 | ~$3-10 | ~$20-30 |

---

## 5. 적용 사례

1. **산업용 HMI** - MIPI DSI + 터치, LVGL UI 프레임워크
2. **산업용 게이트웨이** - 듀얼 Ethernet, RS-485, CAN Bus
3. **PLC 및 산업 제어** - EtherCAT, AMP 멀티시스템
4. **스마트 홈 디스플레이** - 초저전력 200mW, AEC/ANR 음성
5. **핸드헬드 POS 단말기** - 200mW, End-to-end 보안
6. **IoT 엣지 디바이스** - Wi-Fi 6 + BLE 5.2, 4G LTE 옵션
