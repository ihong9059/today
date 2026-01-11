# Samsung 900X5L Linux PC 사양

**작성일**: 2026-01-11
**IP 주소**: 192.168.0.33

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **제조사** | Samsung Electronics |
| **모델명** | 900X5L (노트북 9) |
| **호스트명** | uttec |
| **타입** | 노트북 PC |
| **OS** | Ubuntu 22.04.5 LTS (Jammy Jellyfish) |
| **커널** | Linux 6.8.0-87-generic |
| **아키텍처** | x86-64 |

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | Intel Core i5-6200U (6세대 Skylake) |
| **코어 수** | 2코어 |
| **스레드 수** | 4 스레드 |
| **기본 클럭** | 2.30 GHz |
| **최대 터보** | 2.80 GHz |
| **공정** | 14nm |
| **TDP** | 15W |
| **가상화** | VT-x 지원 |

### 캐시
- **L1d**: 64 KiB (2 instances)
- **L1i**: 64 KiB (2 instances)
- **L2**: 512 KiB (2 instances)
- **L3**: 3 MiB

---

## 메모리 (RAM)

| 항목 | 사양 |
|------|------|
| **총 용량** | 8GB (7.7GiB) |
| **사용중** | 1.1GB |
| **가용** | 6.2GB |
| **Swap** | 4GB |

---

## 저장소

| 항목 | 사양 |
|------|------|
| **디스크** | 256GB SSD (sda) |
| **파티션 구성** | LVM |
| **루트 파티션** | ubuntu--vg-ubuntu--lv |
| **총 용량** | 232GB |
| **사용** | 109GB (49%) |
| **가용** | 113GB |

### 파티션 레이아웃
| 파티션 | 크기 | 마운트 포인트 |
|--------|------|---------------|
| sda1 | 1GB | /boot/efi |
| sda2 | 2GB | /boot |
| sda3 (LVM) | 235.4GB | / |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Intel HD Graphics 520 (내장) |
| **세대** | Skylake GT2 |
| **CUDA** | ❌ 미지원 (Intel GPU) |
| **OpenCL** | ✅ 지원 |

### AI/머신러닝 지원
| 항목 | 지원 |
|------|------|
| **CUDA** | ❌ 미지원 |
| **OpenVINO** | ✅ 지원 (Intel AI) |
| **ONNX Runtime** | ✅ 지원 |
| **PyTorch (CPU)** | ✅ 지원 |

---

## 네트워크

| 항목 | 사양 |
|------|------|
| **IP 주소** | 192.168.0.33 |
| **SSH** | 활성화 |

---

## 설치된 주요 소프트웨어

- VS Code (snap)
- PowerShell (snap)
- LXD (snap)

---

## 성능 비교 (보유 기기)

| 기기 | OS | CPU | RAM | 저장소 | AI 가속 |
|------|-----|-----|-----|--------|---------|
| **Samsung 900X5L** | Ubuntu 22.04 | i5-6200U (2코어/4스레드) | 8GB | 256GB | CPU only |
| ThinkPad 21E7S31000 | Windows 11 | i5-1235U (10코어/12스레드) | 16GB | 512GB | CPU only |
| Galaxy M53 5G | Android | Dimensity 900 | 8GB | 128GB | APU 3.0 |
| Galaxy A23 | Android | Snapdragon 680 | 4GB | 128GB | NNAPI |
| Lenovo TB310FU | Android | Helio G80 | 4GB | 48GB | NNAPI |

---

## 요약

**Samsung 900X5L**은 Ubuntu 22.04 LTS가 설치된 리눅스 개발/서버 환경입니다.

### 장점
- Ubuntu 22.04 LTS 안정적 운영
- 저전력 (15W TDP)
- 113GB 여유 저장공간
- SSH 원격 접속 가능
- VT-x 가상화 지원

### 단점
- 6세대 구형 CPU (2코어/4스레드)
- 8GB RAM (메모리 집약 작업 제한)
- NVIDIA GPU 없음 (AI 가속 불가)

### 적합한 용도
- ✅ 리눅스 서버 운영
- ✅ 웹 개발/테스트
- ✅ Docker 컨테이너 실행
- ✅ SSH 원격 개발 환경
- ⚠️ 경량 AI 추론 (CPU)
- ❌ 대규모 딥러닝/AI 학습

---

## 원본 데이터

### hostnamectl
```
Static hostname: uttec
      Icon name: computer-laptop
        Chassis: laptop
     Machine ID: 06aca9157cf946808c0e2e1a6e395ea7
        Boot ID: 14666722f72b47288116f22e72f5352c
Operating System: Ubuntu 22.04.5 LTS
         Kernel: Linux 6.8.0-87-generic
   Architecture: x86-64
Hardware Vendor: SAMSUNG ELECTRONICS CO., LTD.
 Hardware Model: 900X5L
```

### lscpu
```
Model name: Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
CPU(s): 4
Thread(s) per core: 2
Core(s) per socket: 2
CPU max MHz: 2800.0000
CPU min MHz: 400.0000
Virtualization: VT-x
```

### free -h
```
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       1.1Gi       5.5Gi       151Mi       1.1Gi       6.2Gi
Swap:         4.0Gi          0B       4.0Gi
```

### df -h
```
Filesystem                         Size  Used Avail Use% Mounted on
/dev/mapper/ubuntu--vg-ubuntu--lv  232G  109G  113G  49% /
```

### lspci (GPU)
```
00:02.0 VGA compatible controller: Intel Corporation Skylake GT2 [HD Graphics 520] (rev 07)
```

---

*이 문서는 SSH를 통해 수집된 시스템 정보로 작성되었습니다.*
