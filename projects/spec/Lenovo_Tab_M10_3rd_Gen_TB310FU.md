# Lenovo Tab M10 3rd Gen (TB310FU) 사양

**작성일**: 2026-01-11

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **모델명** | Lenovo TB310FU |
| **제품명** | Lenovo Tab M10 3rd Gen |
| **브랜드** | Lenovo |
| **Android 버전** | 13 |
| **커널 버전** | 4.19.191 |

---

## 접속 방법

### SSH 접속 (Termux)

```bash
# 접속 명령어
ssh u0_a191@192.168.0.31 -p 8022

# 비밀번호
uttec
```

### 접속 전 필수 사항
1. 태블릿에서 **Termux** 앱 실행
2. Termux에서 `sshd` 명령어 실행 (SSH 서버 시작)
3. 같은 WiFi 네트워크에 연결되어 있어야 함

### IP 정보
- **IP 주소**: 192.168.0.31
- **SSH 포트**: 8022

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | MediaTek MT8786V/N (Helio G80 계열) |
| **코어 수** | 8코어 (옥타코어) |
| **클럭 속도** | 2.0 GHz |
| **아키텍처** | ARM64-v8a (64비트) |
| **코어 구성** | 6x Cortex-A55 (효율) + 2x Cortex-A75 (성능) |

### CPU 상세
- CPU part 0xd05: ARM Cortex-A55 (6개)
- CPU part 0xd0a: ARM Cortex-A75 (2개)

---

## 메모리 (RAM)

| 항목 | 용량 |
|------|------|
| **RAM 총량** | 3,955 MB (약 4GB) |
| **사용 가능** | 약 2.1GB |
| **사용 중** | 약 1.9GB |

---

## 저장소

| 항목 | 용량 |
|------|------|
| **전체 용량** | 약 48GB |
| **사용 중** | 12GB (25%) |
| **남은 공간** | 36GB (75%) |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Mali-G52 MC2 (예상) |
| **OpenGL ES** | 3.2 |
| **OpenGL 버전 코드** | 196610 |

---

## 지원 ABI

| 타입 | ABI |
|------|-----|
| 64비트 | arm64-v8a |
| 32비트 | armeabi-v7a, armeabi |

---

## 성능 비교

| 기기 | CPU | 코어 | RAM | 특징 |
|------|-----|------|-----|------|
| Lenovo TB310FU | MT8786 (Helio G80) | 8코어 2.0GHz | 4GB | 태블릿, 큰 화면 |
| Samsung Galaxy A23 | Snapdragon 680 | 8코어 2.4GHz | 4GB | 스마트폰, 휴대성 |

---

## 요약

중급 사양의 태블릿으로, 일반적인 앱 사용과 가벼운 AI 작업에 적합합니다.
- **장점**: 큰 화면 (10인치), 충분한 저장 공간
- **단점**: 스마트폰 대비 CPU 성능 약간 낮음

---

## 원본 데이터

### /proc/cpuinfo (요약)
```
processor   : 0-5  (CPU part: 0xd05 - Cortex-A55)
processor   : 6-7  (CPU part: 0xd0a - Cortex-A75)
Hardware    : MT8786V/N
```

### getprop 정보
```
ro.odm.lenovo.cpuinfo=MediaTek@ MT8786,8,2.0
ro.soc.manufacturer=Mediatek
ro.soc.model=MT8786V/N
ro.product.cpu.abi=arm64-v8a
```

---

*이 문서는 SSH 접속을 통해 수집된 정보로 작성되었습니다.*
