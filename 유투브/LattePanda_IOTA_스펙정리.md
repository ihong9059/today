# LattePanda IOTA 스펙 정리

**관련 영상**: [Raspberry Pi vs Latte Panda iota 요약](./Raspberry_Pi_vs_Latte_Panda_iota_요약.md)
**공식 사이트**: https://www.lattepanda.com/lattepanda-iota
**제조사**: DFRobot

---

## 기본 사양

| 항목 | 사양 |
|------|------|
| **CPU** | Intel N150 (Alder Lake-N), 4코어/4스레드, 최대 3.6GHz |
| **GPU** | Intel Graphics, 24 EU, 최대 1GHz |
| **RAM** | 8GB / 16GB LPDDR5 4800MT/s (ECC 지원) |
| **스토리지** | 64GB / 128GB eMMC 5.1 내장 |
| **BIOS** | UEFI 표준 (CMOS 배터리 필요) |
| **OS 지원** | Windows 10/11, Ubuntu 22.04/24.04 |
| **코프로세서** | RP2040 (133MHz, 264KB SRAM) |

---

## 디스플레이

| 포트 | 사양 |
|------|------|
| HDMI 2.1 | 4096x2160 @ 60Hz |
| eDP 1.4b | 1920x1080 @ 60Hz (터치패널 지원) |

---

## I/O 포트

| 포트 | 수량/사양 |
|------|-----------|
| USB 3.2 Gen2 Type-A | 3개 |
| USB 2.0 헤더 | 1개 |
| USB-C | 1개 (PD 15V 전원 겸용) |
| GbE RJ45 | 1개 (WOL 지원) |
| 3.5mm 오디오 | 1개 (마이크/헤드폰 콤보) |

---

## 확장 슬롯

| 슬롯 | 사양 | 용도 |
|------|------|------|
| M.2 E-Key 2230 | Wi-Fi/BT 카드용 | 무선 네트워크 |
| PCIe FPC | Gen3 x1 | 추가 확장 |
| TF 카드 | microSD | 추가 스토리지 |

---

## 전원 / 물리 사양

| 항목 | 사양 |
|------|------|
| TDP | 6~15W (설정 가능) |
| 유휴 소비전력 | ~8W |
| 전원 입력 | USB-C PD 15V 또는 PH2.0-4Pin (10~15V DC) |
| 크기 | 88mm x 70mm x 19mm |

---

## 모델별 가격

| 구성 | RAM | 스토리지 | 가격 (USD) |
|------|-----|----------|------------|
| 보드만 | 8GB | 64GB | $129 |
| 키트 (Wi-Fi + 쿨러 포함) | 8GB | 64GB | ~$170 |
| 고사양 보드 | 16GB | 128GB | ~$378 |

---

## vs Raspberry Pi 5 비교

| 항목 | Raspberry Pi 5 (8GB) | LattePanda IOTA (8GB) |
|------|---------------------|----------------------|
| CPU | BCM2712 (ARM) | **Intel N150 (x86)** |
| CPU 성능 | 기준 | **2~3배** |
| GPU 성능 | 기준 | **10~30배** |
| 아키텍처 | ARM | **x86** |
| BIOS | 커스텀 부트로더 | **UEFI 표준** |
| RAM | 8GB LPDDR4X | 8GB **LPDDR5** (ECC) |
| 내장 스토리지 | 없음 (SD/NVMe 별매) | **64GB eMMC** |
| USB 3.x | 2개 | **3개 (Gen2)** |
| 네트워크 | 1GbE | 1GbE |
| 소비전력 | ~5W (유휴) | ~8W (유휴) |
| 크기 | 85 x 56mm | 88 x 70mm |
| 가격 (본체) | $80 | $129 |
| 가격 (올인원) | $121+ (부품 별매) | $129~170 |
| GPIO | 40핀 | 있음 (제거 희망 의견 있음) |

---

## 참고 링크

- [LattePanda 공식 페이지](https://www.lattepanda.com/lattepanda-iota)
- [DFRobot 제품 페이지](https://www.dfrobot.com/product-2989.html)
- [Electromaker 리뷰](https://www.electromaker.io/blog/article/lattepanda-iota-review-8-faster-x86-board-for-embedded-development)
- [홈서버 리뷰 (techtipsy)](https://ounapuu.ee/posts/2025/11/18/lattepanda-iota/)

---

*작성일: 2026-04-18*
