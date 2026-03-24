# Luckfox Core3506 Linux 포팅 가이드

## 목차
1. [개요](#개요)
2. [개발 환경 요구사항](#개발-환경-요구사항)
3. [SDK 다운로드 및 설정](#sdk-다운로드-및-설정)
4. [SDK 컴파일](#sdk-컴파일)
5. [Buildroot 커스터마이징](#buildroot-커스터마이징)
6. [이미지 플래싱](#이미지-플래싱)
7. [시스템 로그인 및 기본 설정](#시스템-로그인-및-기본-설정)
8. [문제 해결](#문제-해결)
9. [참고 자료](#참고-자료)

---

## 개요

이 문서는 Luckfox Core3506 (RK3506B) 기반 보드에 Linux (Buildroot)를 포팅하는 방법을 설명합니다. Core3506은 Rockchip RK3506B SoC를 기반으로 하며, Triple-core ARM Cortex-A7과 ARM Cortex-M0 프로세서를 통합한 이종 멀티코어 아키텍처를 사용합니다.

### 지원 운영체제
- **Buildroot Linux** (공식 지원)
- **Ubuntu 24.04** (커뮤니티 지원 - [rk3506-ubuntu](https://github.com/markbirss/rk3506-ubuntu))

### 지원 저장 매체
- SD 카드 (TF Card)
- SPI NAND Flash
- eMMC

---

## 개발 환경 요구사항

### 호스트 PC 요구사항

| 항목 | 요구사항 |
|------|----------|
| 운영체제 | **Ubuntu 22.04 LTS x86_64** (필수) |
| 디스크 공간 | 최소 100GB 이상 |
| RAM | 최소 8GB (16GB 권장) |
| 인터넷 연결 | SDK 다운로드 및 패키지 설치에 필요 |

> **중요**: Ubuntu 22.04 LTS 이외의 플랫폼은 공식적으로 지원되지 않습니다.

### 필수 패키지 설치

```bash
sudo apt-get update
sudo apt-get install -y \
    git \
    ssh \
    make \
    gcc \
    libssl-dev \
    liblz4-tool \
    expect \
    g++ \
    patchelf \
    chrpath \
    gawk \
    texinfo \
    chrpath \
    diffstat \
    binfmt-support \
    qemu-user-static \
    live-build \
    bison \
    flex \
    fakeroot \
    cmake \
    gcc-multilib \
    g++-multilib \
    unzip \
    device-tree-compiler \
    ncurses-dev \
    libgucharmap-2-90-dev \
    bzip2 \
    expat \
    gpgv2 \
    cpp-aarch64-linux-gnu \
    libgmp-dev \
    libmpc-dev \
    bc \
    python-is-python3 \
    python2
```

### Python 설정

SDK는 Python 2와 Python 3를 모두 사용합니다. 기본 python 명령이 python3를 가리키도록 설정합니다:

```bash
# python3를 기본으로 설정
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# python2 심볼릭 링크 생성 (필요시)
sudo ln -sf /usr/bin/python2 /usr/bin/python2
```

---

## SDK 다운로드 및 설정

### SDK 다운로드

**방법 1: GitHub (권장)**
```bash
git clone https://github.com/LuckfoxTECH/luckfox-pico.git
cd luckfox-pico
```

**방법 2: Gitee (중국 미러)**
```bash
git clone https://gitee.com/LuckfoxTECH/luckfox-pico.git
cd luckfox-pico
```

**방법 3: 공식 압축 파일**
1. [Luckfox Wiki 다운로드 페이지](https://wiki.luckfox.com/Luckfox-Lyra/Download/)에서 SDK tar.gz 파일 다운로드
2. 압축 해제:
```bash
tar -xzf luckfox_linux6.1_rk3506_release_*.tar.gz
cd luckfox-lyra-sdk
```

### 저장소 동기화

```bash
.repo/repo/repo sync -l
```

### SDK 디렉토리 구조

```
luckfox-lyra-sdk/
├── buildroot/          # Buildroot 루트 파일시스템
├── yocto/              # Yocto 프로젝트 (선택사항)
├── app/                # 애플리케이션 코드
├── kernel/             # Linux 커널 소스
├── u-boot/             # U-Boot 부트로더
├── device/             # 디바이스 설정 파일
│   └── rockchip/
│       └── rk3506/     # RK3506 관련 설정
├── docs/               # 문서
├── external/           # 외부 패키지
├── prebuilts/          # 사전 빌드된 바이너리
├── tools/              # 빌드 도구
└── build.sh            # 메인 빌드 스크립트
```

---

## SDK 컴파일

### 1. 하드웨어 선택

```bash
./build.sh lunch
```

대화형 메뉴가 나타나면 다음을 선택합니다:

**하드웨어 버전 선택:**
- `RK3506G_Luckfox_Lyra` - Lyra 기본 보드
- `RK3506G_Luckfox_Lyra_Plus` - Lyra Plus
- `RK3506B_Luckfox_Lyra_Ultra` - Lyra Ultra (Core3506 기반)
- `RK3506G_Luckfox_Lyra_Zero_W` - Lyra Zero W
- `RK3506B_Luckfox_Lyra_Pi` - Lyra Pi (Core3506 기반)

**부팅 매체 선택:**
- `SD_CARD` - SD 카드 부팅
- `SPI_NAND` - SPI NAND Flash 부팅

**시스템 선택:**
- `Buildroot` - Buildroot Linux 시스템

### 2. 전체 빌드

```bash
./build.sh
```

> **주의**: 이미지 컴파일 과정에서 `sudo` 명령을 무분별하게 사용하지 마세요. 권한 문제가 발생할 수 있습니다.

### 3. 모듈별 빌드

개별 컴포넌트만 빌드해야 할 경우:

| 명령어 | 설명 | 생성 파일 |
|--------|------|-----------|
| `./build.sh uboot` | U-Boot 부트로더 빌드 | `MiniLoaderAll.bin`, `uboot.img` |
| `./build.sh kernel` | Linux 커널 빌드 | `boot.img` |
| `./build.sh rootfs` | 루트 파일시스템 빌드 | `rootfs.img` |
| `./build.sh firmware` | 전체 펌웨어 패키징 | `update.img` |
| `./build.sh all` | 전체 빌드 | 모든 이미지 |

### 4. 생성된 이미지 파일

빌드 완료 후 `rockdev/` 디렉토리에 다음 파일이 생성됩니다:

| 파일명 | 설명 |
|--------|------|
| `MiniLoaderAll.bin` | 부트로더 |
| `uboot.img` | U-Boot 이미지 |
| `boot.img` | 커널 및 디바이스 트리 |
| `rootfs.img` | 루트 파일시스템 |
| `update.img` | 통합 펌웨어 이미지 |

---

## Buildroot 커스터마이징

### Buildroot 설정 열기

```bash
./build.sh buildroot-config
```

### 설정 인터페이스 조작법

| 키 | 기능 |
|----|------|
| ↑/↓ | 항목 이동 |
| ←/→ | 메뉴 옵션 이동 |
| Enter | 서브메뉴 진입 |
| Y/Space | 기능 활성화 |
| N | 기능 비활성화 |
| M | 모듈로 선택 |
| Esc | 이전 메뉴로 이동 |
| /? | 검색/도움말 |

### 패키지 추가 예시 (bzip2 라이브러리)

1. `./build.sh buildroot-config` 실행
2. `/` 키로 "BZIP2" 검색
3. Y 또는 Space로 패키지 활성화
4. 설정 저장 후 종료
5. `./build.sh rootfs`로 루트 파일시스템 재빌드

### 오버레이 파일시스템 추가

커스텀 파일을 루트 파일시스템에 추가하려면:

1. 오버레이 디렉토리 생성:
```bash
mkdir -p buildroot/board/rockchip/rk3506/luckfox-overlay
```

2. 디렉토리 구조에 맞게 파일 배치:
```bash
# 예: /etc/myconfig.conf 추가
mkdir -p buildroot/board/rockchip/rk3506/luckfox-overlay/etc
cp myconfig.conf buildroot/board/rockchip/rk3506/luckfox-overlay/etc/
```

3. `buildroot/configs/rockchip_rk3506_luckfox_defconfig`에 오버레이 경로 추가:
```
BR2_ROOTFS_OVERLAY="board/rockchip/rk3506/luckfox-overlay"
```

4. 펌웨어 재패키징:
```bash
./build.sh firmware
```

### 빌드 캐시 정리

의존성 추가 후 재빌드 시 캐시 삭제가 필요할 수 있습니다:

```bash
rm -rf buildroot/output/rockchip_rk3506_luckfox/build/python3-*
./build.sh rootfs
```

---

## 이미지 플래싱

### Windows 환경

#### 필요 도구 설치

1. **RK Driver Assistant** 다운로드 및 설치 (USB 드라이버)
2. **RKDevTool** 다운로드 (플래싱 도구)
3. **SDDiskTool** 다운로드 (TF 카드 플래싱용)

다운로드: [Luckfox Wiki 다운로드 페이지](https://wiki.luckfox.com/Luckfox-Lyra/Download/)

#### eMMC/SPI NAND 플래싱 절차

1. **BOOT 버튼을 누른 상태로** 보드를 PC에 USB 연결
2. 연결 후 BOOT 버튼 해제
3. RKDevTool 실행 - "Found One LOADER Device" 메시지 확인
4. "Firmware" 클릭 → `update.img` 선택
5. "Upgrade" 클릭
6. "Download Successful" 메시지 확인 후 완료

#### TF 카드 플래싱 절차

1. SD Card Formatter로 카드 포맷
2. SDDiskTool 실행
3. 이미지 파일 선택 후 쓰기

### Linux 환경 (Ubuntu 22.04)

#### 필요 도구

- `Upgrade_Tool` (SDK에 포함)
- `rkflash.sh` 스크립트 (SDK에 포함)

#### eMMC/SPI NAND 플래싱 절차

```bash
# BOOT 버튼을 누른 상태로 USB 연결
# 디바이스 인식 확인
lsusb | grep Rockchip

# 플래싱 실행 (루트 권한 필요)
sudo ./rkflash.sh update

# 또는 직접 Upgrade_Tool 사용
sudo ./upgrade_tool uf rockdev/update.img
```

### 업그레이드 모드

| 모드 | 설명 | 진입 방법 |
|------|------|-----------|
| **Loader Mode** | 일반 펌웨어 업데이트 | BOOT 버튼 누르고 USB 연결 |
| **MaskRom Mode** | 하드웨어 레벨 복구 | 클럭 핀 단락 필요 |

---

## 시스템 로그인 및 기본 설정

### 기본 로그인 정보

| 항목 | 값 |
|------|-----|
| 사용자명 | `root` |
| 비밀번호 | `luckfox` |

### 시리얼 콘솔 접속

1. USB-to-TTL 어댑터를 보드의 UART 핀에 연결
2. 시리얼 터미널 프로그램 설정:
   - **Baud Rate**: 115200
   - **Data Bits**: 8
   - **Stop Bits**: 1
   - **Parity**: None

```bash
# Linux에서 minicom 사용
sudo minicom -D /dev/ttyUSB0 -b 115200
```

### SSH 접속

이더넷 또는 WiFi 연결 후:
```bash
ssh root@<보드_IP_주소>
```

---

## 문제 해결

### 빌드 오류

**문제**: `command not found` 오류
```bash
# 필수 패키지 재설치
sudo apt-get install -y build-essential cmake bison flex
```

**문제**: Python 관련 오류
```bash
# Python 버전 확인 및 재설정
python --version
sudo update-alternatives --config python
```

**문제**: 권한 오류
```bash
# SDK 디렉토리 권한 수정 (sudo로 빌드하지 마세요)
sudo chown -R $USER:$USER luckfox-lyra-sdk/
```

### 플래싱 오류

**문제**: 디바이스가 인식되지 않음
1. USB 케이블 확인 (데이터 케이블 사용)
2. BOOT 버튼을 누른 상태에서 연결했는지 확인
3. Windows: RK Driver Assistant 재설치
4. Linux: udev 규칙 추가

```bash
# Linux udev 규칙 추가
sudo tee /etc/udev/rules.d/99-rockchip.rules << 'EOF'
SUBSYSTEM=="usb", ATTR{idVendor}=="2207", MODE="0666", GROUP="plugdev"
EOF
sudo udevadm control --reload-rules
sudo udevadm trigger
```

### 부팅 오류

**문제**: 부팅 멈춤
1. 시리얼 콘솔로 부팅 로그 확인
2. SD 카드/eMMC 이미지 재플래싱
3. 전원 공급 확인 (5V/2A 이상 권장)

---

## 참고 자료

### 공식 문서
- [Luckfox Wiki - Core3506 Introduction](https://wiki.luckfox.com/Core3506/Introduction/)
- [Luckfox Wiki - SDK Image Compilation](https://wiki.luckfox.com/Luckfox-Lyra/SDK-Image-Compilation/)
- [Luckfox Wiki - Buildroot Configuration](https://wiki.luckfox.com/Luckfox-Lyra/Buildroot-Configuration/)
- [Luckfox Wiki - Image Flashing](https://wiki.luckfox.com/Luckfox-Lyra/Image-flashing/)
- [Luckfox Wiki - Download](https://wiki.luckfox.com/Luckfox-Lyra/Download/)

### GitHub 저장소
- [Luckfox Pico SDK (공식)](https://github.com/LuckfoxTECH/luckfox-pico)
- [RK3506 Ubuntu Builder (커뮤니티)](https://github.com/markbirss/rk3506-ubuntu)

### 구매 링크
- [Luckfox 공식 스토어](https://www.luckfox.com/)
- [Waveshare](https://www.waveshare.com/core3506.htm)
- [Amazon](https://www.amazon.com/s?k=luckfox+core3506)

---

## 부록: 설정 파일 위치

| 파일 | 경로 | 설명 |
|------|------|------|
| Defconfig | `device/rockchip/rk3506/` | 보드별 기본 설정 |
| Buildroot Config | `buildroot/configs/rockchip_rk3506_luckfox_defconfig` | Buildroot 설정 |
| Kernel Config | `kernel/arch/arm/configs/` | 커널 설정 |
| Device Tree | `kernel/arch/arm/boot/dts/rockchip/` | 디바이스 트리 소스 |

---

*문서 작성일: 2026-03-19*
*SDK 버전: luckfox_linux6.1_rk3506_release_v1.4*
