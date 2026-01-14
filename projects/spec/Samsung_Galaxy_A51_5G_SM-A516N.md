# Samsung Galaxy A51 5G (SM-A516N) 사양

**작성일**: 2026-01-14

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **모델명** | SM-A516N |
| **제품명** | Samsung Galaxy A51 5G |
| **브랜드** | Samsung |
| **Android 버전** | 13 |
| **SDK 버전** | 33 |
| **빌드 번호** | TP1A.220624.014.A516NKSS8FXE1 |
| **보안 패치** | 2024-05-01 |
| **시리얼 번호** | R5CN500KERL |

---

## 접속 방법

### USB ADB 접속

```bash
# ADB 장치 확인
adb devices

# 결과
R5CN500KERL    device

# 특정 기기 지정 (여러 기기 연결 시)
adb -s R5CN500KERL shell
```

### 접속 전 필수 사항
1. 스마트폰에서 **개발자 옵션** 활성화
2. **USB 디버깅** 켜기
3. USB 케이블로 PC에 연결
4. "USB 디버깅 허용" 팝업에서 **허용** 선택

### SSH 접속 (Termux)

| 항목 | 값 |
|------|-----|
| **IP 주소** | 192.168.0.17 (회사) |
| **포트** | 8022 |
| **사용자** | u0_a340 |

```bash
ssh -p 8022 u0_a340@192.168.0.17
```

---

## Termux 환경

| 항목 | 버전 |
|------|------|
| **Node.js** | 25.2.1 |
| **npm** | 11.6.2 |
| **Claude Code** | 2.1.7 |
| **OpenSSH** | 설치됨 |

### Claude 사용법

```bash
# SSH 접속 후 Claude 실행
claude

# 또는 API 키로 인증
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
claude
```

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | Samsung Exynos 980 |
| **플랫폼** | exynos980 |
| **코어 수** | 8코어 (옥타코어) |
| **아키텍처** | ARM64-v8a (64비트) |
| **공정** | 8nm |

### CPU 코어 구성

| 코어 | 타입 | 클럭 속도 | 개수 |
|------|------|----------|------|
| 0-5 | Cortex-A55 (효율) | 최대 2.0 GHz | 6개 |
| 6-7 | Cortex-A77 (성능) | 최대 2.2 GHz | 2개 |

### CPU 상세
- CPU part 0xd05: ARM Cortex-A55 (6개) - 효율 코어
- CPU part 0xd46: ARM Cortex-A77 (2개) - 성능 코어
- Hardware: Samsung Exynos 980

---

## 메모리 (RAM)

| 항목 | 용량 |
|------|------|
| **RAM 총량** | 5,452 MB (약 5.2GB) |

---

## 저장소

| 항목 | 용량 |
|------|------|
| **전체 용량** | 109GB (128GB 모델) |
| **사용 중** | 15GB (14%) |
| **남은 공간** | 94GB (86%) |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Mali-G76 MP5 |
| **OpenGL ES** | 3.2 |
| **OpenGL 버전 코드** | 196610 |
| **Vulkan** | 지원 |

---

## 디스플레이

| 항목 | 사양 |
|------|------|
| **해상도** | 1080 x 2400 (FHD+) |
| **물리적 밀도** | 420 dpi |
| **화면 크기** | 6.5인치 |
| **화면 비율** | 20:9 |
| **주사율** | 60Hz |
| **패널** | Super AMOLED |

---

## 5G 지원

| 항목 | 사양 |
|------|------|
| **5G** | Sub-6GHz 지원 |
| **LTE** | 지원 |
| **WiFi** | WiFi 5 (802.11ac) |

---

## 배터리

| 항목 | 값 |
|------|-----|
| **용량** | 4,500 mAh |
| **현재 충전량** | 100% |
| **온도** | 26.7°C |

---

## 지원 ABI

| 타입 | ABI |
|------|-----|
| 64비트 | arm64-v8a |
| 32비트 | armeabi-v7a, armeabi |

---

## 성능 비교 (보유 기기)

| 기기 | CPU | 코어 | RAM | 저장소 | 특징 |
|------|-----|------|-----|--------|------|
| Galaxy M53 5G | Dimensity 900 | 8코어 2.4GHz | **8GB** | 128GB | **최고 성능**, 5G |
| **Galaxy A51 5G** | Exynos 980 | 8코어 2.2GHz | 5.2GB | 128GB | 5G, 테스트용 |
| Galaxy A23 | Snapdragon 680 | 8코어 2.4GHz | 4GB | 128GB | 중급, 4G |
| Lenovo TB310FU | Helio G80 | 8코어 2.0GHz | 4GB | 48GB | 태블릿, 큰 화면 |

---

## 용도

- **테스트 기기**: 초기화 가능한 테스트용
- **Claude Code**: Termux에서 Claude Code CLI 실행 가능
- **SensorMonitor**: 센서 데이터 수집 및 전송

---

## SensorMonitor 앱

| 항목 | 값 |
|------|-----|
| **앱 설치** | 완료 |
| **EC2 서버** | http://52.78.119.132:5000 |
| **디바이스명** | samsung SM-A516N |

### APK 설치 명령어

```bash
adb -s R5CN500KERL install -r SensorMonitor/app/build/outputs/apk/debug/app-debug.apk
```

---

*이 문서는 ADB를 통해 수집된 정보로 작성되었습니다.*
