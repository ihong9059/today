# REVITA Tower — USB Host 이슈 검토보고서

## 문서 정보
- **작성일**: 2026-04-11
- **대상 보드**: Luckfox Core3506 (RK3506B) — REVITA Tower
- **원본 로그**: `리비타 타워 USB 시도 로그.pdf`
- **이슈 요약**: USB OTG1 포트의 Host 모드가 동작하지 않음

---

## 1. 현재 상황 요약

### 보드 구성
- SoC: Rockchip RK3506B
- USB 컨트롤러: DWC2 (DesignWare Core) × 2
  - **OTG0** (`ff740000.usb`) — 펌웨어 로딩용 (PC 연결)
  - **OTG1** (`ff780000.usb`) — USB Host로 사용하고자 함 (CCTV 등 외부 장치 연결 목적)

### 펌웨어 시도 이력

| 버전 | 설정 | 결과 |
|------|------|------|
| firmware_v2 | 기본 (이더넷 정상) | 기준 펌웨어 |
| firmware_v4 | OTG1을 OTG → Host로 변경 | **Host 안됨** — "Cannot enable" 에러 |
| firmware_v5 | OTG1: Host, OTG0: peripheral → OTG | Device 모드는 OK, Host 안됨 |
| firmware_v6 | 모두 peripheral | OTG1 peripheral도 안됨 (D+ 풀업 안됨) |
| firmware_v7 | OTG1 Host + disable-over-current | Host 안됨 |
| firmware_v8 | UART 시도 | 고장나서 안돌아감 |
| firmware_v9 | OTG0/OTG1 둘 다 Host + disable-over-current | Host 안됨 |

---

## 2. 핵심 증상

### 2-1. Host 모드 에러 로그
```
[ 153.616545] usb usb1-port1: Cannot enable. Maybe the USB cable is bad?
[ 154.793223] usb usb1-port1: Cannot enable. Maybe the USB cable is bad?
[ 154.793375] usb usb1-port1: attempt power cycle
```

USB 장치가 연결되면 포트 enable(reset → speed negotiation)에 실패한다.

### 2-2. Peripheral 모드 상태
```
== /sys/class/udc/ff740000.usb ==    ← OTG0
USB_UDC_NAME=ff740000.usb
USB_UDC_DRIVER=rockchip
configured                            ← 정상 attached

== /sys/class/udc/ff780000.usb ==    ← OTG1
USB_UDC_NAME=ff780000.usb
not attached                          ← D+ 풀업 안됨
```

OTG1(`ff780000.usb`)은 Peripheral 모드로 설정해도 **D+ 풀업이 동작하지 않아** PC에 인식되지 않는다.

### 2-3. 검증 완료 사항 (문제 아닌 것)
- ❌ USB 케이블 불량 → 아님 (다른 장치에서 정상)
- ❌ OTG1 배선 문제 → 아님 (OTG0 포트를 OTG1 배선으로 바꿔도 OTG0는 device 모드 정상)
- ❌ 전원 문제 → 아님 (5V 별도 공급 확인)
- ❌ USB 허브 문제 → 아님 (직결 연결에서도 동일 증상)
- ❌ PC 충돌 → 아님 (SSH 접속 상태에서도 동일)
- ❌ Over-current protection → disable-over-current 적용해도 동일

---

## 3. 문제 분석

### 3-1. 근본 원인 추정: OTG1(ff780000) 컨트롤러의 PHY 초기화 실패

**증거 종합:**
1. OTG0(`ff740000`)는 Host/Peripheral 모두 정상 동작
2. OTG1(`ff780000`)은 Host/Peripheral 어느 모드에서도 비정상
3. D+ 풀업이 안 된다는 것은 **USB PHY가 제대로 초기화되지 않았음**을 의미
4. DWC2 드라이버 unbind/bind 재시도해도 동일 → 드라이버 레벨이 아닌 **PHY 또는 하드웨어 레벨 문제**

### 3-2. 가능한 원인 (우선순위 순)

#### 원인 1: USB PHY 클럭/리셋 미설정 (가능성: ★★★★★)
RK3506B의 OTG1 PHY에 대한 클럭 enable 또는 reset deassert가 Device Tree에서 누락되었을 가능성이 높다. Rockchip SoC에서 각 USB 컨트롤러는 독립적인 PHY 클럭과 리셋 라인을 가지며, 이를 DT에서 정확히 지정해야 한다.

#### 원인 2: GRF(General Register File) USB 모드 레지스터 미설정 (가능성: ★★★★☆)
Rockchip SoC는 GRF 레지스터를 통해 USB 포트의 Host/Device/OTG 모드를 하드웨어 레벨에서 설정한다. OTG1에 대한 GRF 설정이 누락되거나 잘못되었을 수 있다.

#### 원인 3: VBUS DET(Detection) 핀 문제 (가능성: ★★★☆☆)
로그 작성자도 마지막에 "VBUS DET를 끊어본다"고 언급. Host 모드에서는 VBUS를 공급하는 쪽이므로 VBUS Detection이 잘못 설정되면 Host 포트가 활성화되지 않을 수 있다.

#### 원인 4: OTG1 물리적 연결 문제 — 커스텀 캐리어 보드 배선 (가능성: ★★☆☆☆)
Core3506은 120핀 캐스텔레이션 홀로 캐리어 보드에 연결되며, REVITA Tower의 커스텀 캐리어 보드에서 OTG1의 D+/D- 배선이 정상인지 확인 필요. 단, 작성자가 "배선 문제 아니다"라고 했으므로 우선순위 낮음.

---

## 4. 해결 방안

### 방안 1: Device Tree USB PHY 설정 점검 (최우선)

**확인할 DTS 파일:**
```
kernel/arch/arm/boot/dts/rockchip/rk3506*.dtsi
kernel/arch/arm/boot/dts/rockchip/*luckfox*.dts
```

**점검 항목:**

```dts
/* OTG1 노드에 다음이 올바르게 설정되어 있는지 확인 */
&usb_otg1 {   /* 또는 &usb2_otg1, 칩에 따라 다름 */
    compatible = "rockchip,rk3506-usb", "rockchip,rk3328-usb",
                 "snps,dwc2";
    reg = <0xff780000 0x40000>;
    interrupts = <GIC_SPI xx IRQ_TYPE_LEVEL_HIGH>;

    /* ★ 핵심: 클럭과 리셋이 올바르게 지정되었는지 */
    clocks = <&cru CLK_OTG1_ADP>,
             <&cru PCLK_OTG1>,
             <&cru HCLK_OTG1>;   /* ← 칩 TRM 확인 필요 */
    clock-names = "otg", "pclk", "hclk";  /* ← 매핑 확인 */
    resets = <&cru SRST_OTG1>, <&cru SRST_OTG1_ADP>;
    reset-names = "dwc2", "dwc2-ecc";

    /* ★ PHY 참조 */
    phys = <&u2phy_otg1>;
    phy-names = "usb2-phy";

    /* Host 모드 설정 */
    dr_mode = "host";

    status = "okay";
};
```

**반드시 확인할 것:**
1. `phys` 속성이 실제 PHY 노드를 참조하고 있는지
2. PHY 노드 자체가 `status = "okay"`인지
3. PHY 노드의 클럭/리셋 설정이 완전한지

### 방안 2: USB PHY 노드 확인 및 활성화

```dts
/* USB2 PHY 노드 — OTG1용 */
&u2phy1 {           /* 또는 &usb2phy1, 칩에 따라 다름 */
    status = "okay";

    &u2phy1_otg {   /* OTG1용 PHY 포트 */
        status = "okay";
        /* Host 모드일 때 VBUS 공급 GPIO 설정 */
        /* vbus-supply = <&vcc5v0_otg1>; */
    };
};
```

### 방안 3: GRF 레지스터 런타임 확인

SSH 접속 후 다음 명령으로 USB 관련 GRF 레지스터 상태를 확인:

```bash
# USB PHY 상태 확인
cat /sys/kernel/debug/usb/ff780000.usb/regdump | head -20

# PHY 레지스터 직접 읽기 (io 도구 필요)
io -4 0xff740000    # OTG0 — 정상 동작하는 것과 비교
io -4 0xff780000    # OTG1 — 문제 포트

# USB PHY GRF 확인 (RK3506 TRM 참조하여 주소 확인)
# 일반적으로 0xFDC30000 ~ 0xFDC3FFFF 영역
```

### 방안 4: VBUS Detection 비활성화 시도

Host 모드에서 VBUS Detection이 간섭할 수 있으므로:

```dts
&usb_otg1 {
    dr_mode = "host";
    /* VBUS detection 관련 비활성화 */
    hnp-disable;
    srp-disable;
    adp-disable;
};
```

또는 런타임에서:
```bash
# VBUS DET 핀을 물리적으로 분리하거나
# DT에서 vbus-det GPIO를 제거
```

### 방안 5: 커널 드라이버 디버그 로그 활성화

```bash
# DWC2 드라이버 디버그 활성화
echo 8 > /proc/sys/kernel/printk
echo -n 'module dwc2 +p' > /sys/kernel/debug/dynamic_debug/control

# USB core 디버그
echo -n 'module usbcore +p' > /sys/kernel/debug/dynamic_debug/control

# USB PHY 디버그
echo -n 'module phy_rockchip_usb +p' > /sys/kernel/debug/dynamic_debug/control

# 이후 USB 장치 연결하여 dmesg 확인
dmesg -w
```

---

## 5. 조치 우선순위 (액션 플랜)

| 순서 | 조치 | 예상 소요 | 비고 |
|------|------|----------|------|
| 1 | DTS에서 OTG1의 PHY 참조 확인 | 30분 | `phys`, `phy-names` 속성 확인 |
| 2 | USB PHY 노드 status 확인 | 15분 | `u2phy1` 또는 동등 노드가 "okay"인지 |
| 3 | PHY 클럭/리셋 설정 비교 | 1시간 | OTG0(정상)과 OTG1(비정상) DTS 비교 |
| 4 | DWC2 디버그 로그 수집 | 30분 | 방안 5의 명령어 실행 |
| 5 | GRF 레지스터 비교 | 1시간 | OTG0 vs OTG1 레지스터 덤프 비교 |
| 6 | VBUS DET 분리 테스트 | 30분 | 하드웨어 수정 필요 |
| 7 | Luckfox 공식 포럼/GitHub Issue 확인 | 30분 | 동일 이슈 보고 여부 |

---

## 6. 참고: Rockchip DWC2 USB 아키텍처

```
┌─────────────────────────────────────────────┐
│                 RK3506B SoC                  │
│                                             │
│  ┌──────────┐    ┌──────────┐               │
│  │  DWC2 #0 │    │  DWC2 #1 │  ← USB 컨트롤러│
│  │ff740000  │    │ff780000  │               │
│  └────┬─────┘    └────┬─────┘               │
│       │               │                     │
│  ┌────┴─────┐    ┌────┴─────┐               │
│  │ USB PHY  │    │ USB PHY  │  ← USB PHY    │
│  │  #0      │    │  #1      │               │
│  └────┬─────┘    └────┬─────┘               │
│       │               │                     │
│  ┌────┴─────┐    ┌────┴─────┐               │
│  │   GRF    │    │   GRF    │  ← 모드 설정   │
│  │ 레지스터  │    │ 레지스터  │               │
│  └──────────┘    └──────────┘               │
└───────┬───────────────┬─────────────────────┘
        │               │
    ┌───┴───┐       ┌───┴───┐
    │ OTG0  │       │ OTG1  │    ← 외부 핀
    │(정상) │       │(비정상)│
    └───────┘       └───────┘
```

**핵심**: OTG0는 정상이고 OTG1만 안 되므로, 소프트웨어(DTS) 설정에서 OTG1 PHY 관련 누락이 있을 가능성이 가장 높다. Rockchip SDK의 기본 DTS는 종종 하나의 USB 포트만 활성화해 둔다.

---

## 7. 결론

| 항목 | 내용 |
|------|------|
| **문제** | OTG1(`ff780000.usb`)이 Host/Peripheral 어느 모드에서도 동작하지 않음 |
| **근본 원인 (추정)** | OTG1의 USB PHY가 초기화되지 않음 — DTS에서 PHY 노드 참조/활성화 누락 가능성 최대 |
| **우선 조치** | DTS에서 OTG1 PHY 설정을 OTG0(정상)과 비교하여 누락 항목 보완 |
| **현재 우회책** | OTG0를 Host로 사용 (단, 펌웨어 로딩에 OTG0 필요하므로 운영 시에만 전환) |

---

*검토보고서 작성일: 2026-04-11*
