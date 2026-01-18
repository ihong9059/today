# 보유 기기 종합 성능 비교표

**작성일**: 2026-01-18
**목적**: 모든 보유 기기(PC, 스마트폰, 태블릿, SBC, 클라우드)의 성능 종합 비교

---

## 전체 기기 목록

| 순번 | 기기명 | 타입 | OS | 주요 용도 |
|:----:|--------|------|-----|----------|
| 1 | Lenovo ThinkPad 21E7S31000 | 노트북 | Windows 11 | 메인 개발 PC |
| 2 | Samsung 900X5L | 노트북 | Ubuntu 22.04 | 리눅스 서버/개발 |
| 3 | AWS t3.small | 클라우드 VM | Amazon Linux | 프로덕션 웹서버 |
| 4 | Raspberry Pi 5 | SBC | Raspberry Pi OS | 개발/테스트 서버 |
| 5 | Raspberry Pi 4 | SBC | Raspberry Pi OS | 백업 서버 |
| 6 | Samsung Galaxy M53 5G | 스마트폰 | Android 14 | 테스트/개발 |
| 7 | Samsung Galaxy A51 5G | 스마트폰 | Android 13 | 테스트/센서 |
| 8 | Samsung Galaxy A23 | 스마트폰 | Android 14 | Claude Code/개발 |
| 9 | Lenovo Tab M10 3rd Gen | 태블릿 | Android 13 | 대화면 테스트 |

---

## CPU 성능 비교

| 기기 | 프로세서 | 아키텍처 | 코어/스레드 | 클럭 | 공정 |
|------|----------|----------|:-----------:|:----:|:----:|
| **ThinkPad** | Intel i5-1235U | x86-64 | 10C/12T | 4.4GHz | 10nm |
| **Samsung 900X5L** | Intel i5-6200U | x86-64 | 2C/4T | 2.8GHz | 14nm |
| **AWS t3.small** | Intel Xeon | x86-64 | 2 vCPU | 2.5GHz+ | - |
| **Raspberry Pi 5** | BCM2712 (A76) | ARM64 | 4C | 2.4GHz | 16nm |
| **Raspberry Pi 4** | BCM2711 (A72) | ARM64 | 4C | 1.8GHz | 28nm |
| **Galaxy M53 5G** | Dimensity 900 | ARM64 | 8C (2+6) | 2.4GHz | 6nm |
| **Galaxy A51 5G** | Exynos 980 | ARM64 | 8C (2+6) | 2.2GHz | 8nm |
| **Galaxy A23** | Snapdragon 680 | ARM64 | 8C (4+4) | 2.4GHz | 6nm |
| **Lenovo Tab M10** | Helio G80 | ARM64 | 8C (2+6) | 2.0GHz | 12nm |

### CPU 코어 상세

| 기기 | 성능 코어 | 효율 코어 | 특징 |
|------|----------|----------|------|
| ThinkPad | 2x P-Core | 8x E-Core | 하이브리드 아키텍처 |
| Samsung 900X5L | 2x Skylake | - | 구형 듀얼코어 |
| Raspberry Pi 5 | 4x Cortex-A76 | - | 단일 구성 |
| Raspberry Pi 4 | 4x Cortex-A72 | - | 단일 구성 |
| Galaxy M53 5G | 2x Cortex-A78 | 6x Cortex-A55 | big.LITTLE |
| Galaxy A51 5G | 2x Cortex-A77 | 6x Cortex-A55 | big.LITTLE |
| Galaxy A23 | 4x Kryo Gold | 4x Kryo Silver | Qualcomm |
| Lenovo Tab M10 | 2x Cortex-A75 | 6x Cortex-A55 | big.LITTLE |

---

## 메모리(RAM) 비교

| 기기 | RAM 용량 | RAM 타입 | 속도 |
|------|:--------:|----------|:----:|
| **ThinkPad** | **16GB** | DDR4 | 3200MHz |
| Samsung 900X5L | 8GB | DDR4 | - |
| AWS t3.small | 2GB | DDR4 ECC | - |
| Raspberry Pi 5 | 4~8GB | LPDDR4X | 4267MHz |
| Raspberry Pi 4 | 4~8GB | LPDDR4 | 3200MHz |
| **Galaxy M53 5G** | **8GB** | LPDDR4X | - |
| Galaxy A51 5G | 5.2GB | LPDDR4X | - |
| Galaxy A23 | 4GB | LPDDR4X | - |
| Lenovo Tab M10 | 4GB | LPDDR4X | - |

---

## 저장소 비교

| 기기 | 용량 | 타입 | 사용률 |
|------|:----:|------|:------:|
| **ThinkPad** | **512GB** | NVMe PCIe 4.0 | - |
| Samsung 900X5L | 256GB | SATA SSD | 49% |
| AWS t3.small | 가변 | EBS gp3 | - |
| Raspberry Pi 5 | microSD/NVMe | PCIe 2.0 | - |
| Raspberry Pi 4 | microSD/USB | USB 3.0 | - |
| Galaxy M53 5G | 128GB | eMMC/UFS | 49% |
| Galaxy A51 5G | 128GB | UFS | 14% |
| Galaxy A23 | 128GB | eMMC | 82% |
| Lenovo Tab M10 | 48GB | eMMC | 25% |

---

## GPU / AI 가속 비교

| 기기 | GPU | AI 가속 | CUDA | OpenGL |
|------|-----|---------|:----:|:------:|
| ThinkPad | Intel UHD | OpenVINO | ❌ | 4.6 |
| Samsung 900X5L | Intel HD 520 | OpenVINO | ❌ | 4.5 |
| AWS t3.small | - | CPU Only | ❌ | - |
| Raspberry Pi 5 | VideoCore VII | - | ❌ | ES 3.1 |
| Raspberry Pi 4 | VideoCore VI | - | ❌ | ES 3.1 |
| **Galaxy M53 5G** | Mali-G68 MC4 | **APU 3.0** | ❌ | ES 3.2 |
| Galaxy A51 5G | Mali-G76 MP5 | NNAPI | ❌ | ES 3.2 |
| Galaxy A23 | Adreno 610 | NNAPI | ❌ | ES 3.2 |
| Lenovo Tab M10 | Mali-G52 MC2 | NNAPI | ❌ | ES 3.2 |

---

## 네트워크/연결성 비교

| 기기 | WiFi | 5G/LTE | Ethernet | SSH/원격 |
|------|:----:|:------:|:--------:|:--------:|
| ThinkPad | WiFi 6 | - | ✅ | ✅ |
| Samsung 900X5L | WiFi 5 | - | ❌ | ✅ SSH |
| AWS t3.small | - | - | 5Gbps | ✅ SSH |
| Raspberry Pi 5 | WiFi 5 | - | 1Gbps | ✅ SSH |
| Raspberry Pi 4 | WiFi 5 | - | 1Gbps | ✅ SSH |
| Galaxy M53 5G | **WiFi 6** | **5G** | - | ✅ Termux |
| Galaxy A51 5G | WiFi 5 | 5G | - | ✅ Termux |
| Galaxy A23 | WiFi 5 | 4G | - | ✅ Termux |
| Lenovo Tab M10 | WiFi 5 | - | - | ✅ Termux |

---

## 디스플레이 비교 (모바일 기기)

| 기기 | 크기 | 해상도 | 패널 | 주사율 |
|------|:----:|--------|------|:------:|
| Galaxy M53 5G | 6.7" | 2400x1080 | Super AMOLED+ | **120Hz** |
| Galaxy A51 5G | 6.5" | 2400x1080 | Super AMOLED | 60Hz |
| Galaxy A23 | 6.6" | 2408x1080 | PLS LCD | 90Hz |
| Lenovo Tab M10 | **10.1"** | 1920x1200 | IPS LCD | 60Hz |

---

## 웹서버 성능 비교 (추정)

| 기기 | nginx (req/s) | Node.js (req/s) | 동시접속 | 적합도 |
|------|:-------------:|:---------------:|:--------:|:------:|
| **AWS t3.small** | ~8,000 | ~3,500 | 200~500 | ⭐⭐⭐⭐⭐ |
| **Raspberry Pi 5** | ~5,500 | ~2,200 | 100~200 | ⭐⭐⭐⭐ |
| ThinkPad | ~7,000 | ~3,000 | 150~300 | ⭐⭐⭐⭐ |
| Samsung 900X5L | ~4,000 | ~1,500 | 80~150 | ⭐⭐⭐ |
| Raspberry Pi 4 | ~3,000 | ~1,200 | 50~100 | ⭐⭐⭐ |
| Galaxy M53 5G | ~2,000 | ~800 | 30~50 | ⭐⭐ |
| Galaxy A51 5G | ~1,500 | ~600 | 20~40 | ⭐⭐ |
| Galaxy A23 | ~1,200 | ~500 | 15~30 | ⭐⭐ |
| Lenovo Tab M10 | ~1,000 | ~400 | 10~20 | ⭐ |

---

## 종합 성능 점수 (100점 만점)

| 기기 | CPU | RAM | 저장소 | 네트워크 | 휴대성 | **종합** |
|------|:---:|:---:|:------:|:--------:|:------:|:--------:|
| **ThinkPad** | 95 | 100 | 100 | 85 | 80 | **92** |
| **AWS t3.small** | 80 | 50 | 95 | 100 | - | **90** |
| **Raspberry Pi 5** | 70 | 80 | 75 | 80 | 30 | **75** |
| **Galaxy M53 5G** | 75 | 80 | 70 | 90 | 100 | **74** |
| Samsung 900X5L | 55 | 70 | 70 | 75 | 75 | **69** |
| Raspberry Pi 4 | 55 | 70 | 60 | 80 | 30 | **62** |
| Galaxy A51 5G | 65 | 60 | 70 | 85 | 100 | **68** |
| Galaxy A23 | 60 | 50 | 70 | 70 | 100 | **62** |
| Lenovo Tab M10 | 50 | 50 | 40 | 70 | 90 | **55** |

---

## 용도별 추천 기기

### 1. 메인 개발 환경
| 순위 | 기기 | 이유 |
|:----:|------|------|
| 1 | **ThinkPad** | 최고 성능, Windows 개발 환경 |
| 2 | Samsung 900X5L | 리눅스 네이티브, 서버 개발 |

### 2. 웹서버 운영
| 순위 | 기기 | 이유 |
|:----:|------|------|
| 1 | **AWS t3.small** | 안정성, 확장성, 24/7 가용성 |
| 2 | **Raspberry Pi 5** | 비용 효율, 충분한 성능 |
| 3 | Raspberry Pi 4 | 백업/보조 서버 |

### 3. 모바일 개발/테스트
| 순위 | 기기 | 이유 |
|:----:|------|------|
| 1 | **Galaxy M53 5G** | 최고 성능, 8GB RAM, 5G |
| 2 | Galaxy A51 5G | 테스트용 초기화 가능 |
| 3 | Galaxy A23 | Claude Code 실행 가능 |

### 4. AI/ML 작업
| 순위 | 기기 | 이유 |
|:----:|------|------|
| 1 | **ThinkPad** | 16GB RAM, 10코어 CPU |
| 2 | **Galaxy M53 5G** | APU 3.0 AI 가속 |
| 3 | Samsung 900X5L | OpenVINO 지원 |

### 5. 휴대성/이동 작업
| 순위 | 기기 | 이유 |
|:----:|------|------|
| 1 | **Galaxy M53 5G** | 5G, 고성능, Claude Code |
| 2 | ThinkPad | 노트북, 풀 개발환경 |
| 3 | Lenovo Tab M10 | 대화면 (10인치) |

---

## 현재 기기별 IP/접속 정보

| 기기 | 위치 | IP | 포트 | 접속 방법 |
|------|------|-----|:----:|----------|
| Samsung 900X5L | 집 | 192.168.0.33 | 22 | SSH |
| Raspberry Pi 5 | 회사 | 192.168.1.8 | 22/2222 | SSH, ngrok |
| Raspberry Pi 4 | 집 | 192.168.0.3 | 22 | SSH |
| Galaxy M53 5G | 집 | 192.168.0.12 | 8022 | Termux SSH |
| Galaxy A51 5G | 회사 | 192.168.0.17 | 8022 | Termux SSH |
| Galaxy A23 | 집 | 192.168.0.32 | 8022 | Termux SSH |
| Lenovo Tab M10 | 집 | 192.168.0.31 | 8022 | Termux SSH |
| AWS sensor-ec2 | AWS | 3.36.86.100 | 22 | SSH (현재 접속 불가) |
| AWS uttec-ec2 | AWS | 52.78.119.132 | 22 | SSH (현재 접속 불가) |

---

## 비용 분석 (연간)

| 기기 | 초기 비용 | 월 비용 | 연간 총비용 | 비고 |
|------|:---------:|:-------:|:-----------:|------|
| ThinkPad | ~$800 | $0 | $800 | 일회성 |
| Samsung 900X5L | ~$500 | ~$3 | $536 | 전기세 포함 |
| **AWS t3.small** | $0 | ~$18 | **$216** | 월정액 |
| Raspberry Pi 5 | ~$80 | ~$3 | $116 | 쿨러 포함 |
| Raspberry Pi 4 | ~$55 | ~$2 | $79 | 저전력 |
| Galaxy M53 5G | ~$350 | $0 | $350 | 일회성 |
| Galaxy A51 5G | ~$250 | $0 | $250 | 일회성 |
| Galaxy A23 | ~$200 | $0 | $200 | 일회성 |
| Lenovo Tab M10 | ~$150 | $0 | $150 | 일회성 |

---

## 결론

### 성능 순위 (웹서버 용도)

```
1위: AWS t3.small      - 프로덕션, 최고 안정성
2위: Lenovo ThinkPad   - 개발 서버, 최고 성능
3위: Raspberry Pi 5    - 개발/테스트, 비용 효율
4위: Samsung 900X5L    - 리눅스 서버
5위: Raspberry Pi 4    - 백업/보조 서버
6위: Galaxy M53 5G     - 모바일 테스트 서버
7위: Galaxy A51 5G     - 모바일 테스트
8위: Galaxy A23        - 경량 테스트
9위: Lenovo Tab M10    - 대화면 테스트
```

### 카테고리별 최고 기기

| 카테고리 | 최고 기기 | 점수 |
|----------|----------|:----:|
| **종합 성능** | ThinkPad | 92/100 |
| **웹서버** | AWS t3.small | 90/100 |
| **비용 효율** | Raspberry Pi 4 | $79/년 |
| **모바일 성능** | Galaxy M53 5G | 74/100 |
| **휴대성** | Galaxy M53 5G | 100/100 |
| **AI 가속** | Galaxy M53 5G (APU 3.0) | - |

---

*이 문서는 보유한 모든 기기의 성능을 종합 비교하기 위해 작성되었습니다.*
*실제 성능은 워크로드, 설정, 환경에 따라 달라질 수 있습니다.*
