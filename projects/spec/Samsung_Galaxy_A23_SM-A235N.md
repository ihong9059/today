# Samsung Galaxy A23 (SM-A235N) 사양

**작성일**: 2026-01-11

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **모델명** | SM-A235N |
| **제품명** | Samsung Galaxy A23 |
| **브랜드** | Samsung |
| **Android 버전** | 14 |
| **SDK 버전** | 34 |
| **빌드 번호** | UP1A.231005.007.A235NKSSBEYL1 |
| **보안 패치** | 2025-11-01 |
| **시리얼 번호** | R59T406TH0P |

---

## 접속 방법

### USB ADB 접속

```bash
# ADB 장치 확인
adb devices

# 결과
R59T406TH0P    device
```

### 접속 전 필수 사항
1. 스마트폰에서 **개발자 옵션** 활성화
2. **USB 디버깅** 켜기
3. USB 케이블로 PC에 연결

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | Qualcomm Snapdragon 680 (KHAJE) |
| **플랫폼** | bengal |
| **코어 수** | 8코어 (옥타코어) |
| **아키텍처** | ARM64-v8a (64비트) |

### CPU 코어 구성

| 코어 | 타입 | 클럭 속도 | 개수 |
|------|------|----------|------|
| 0-3 | Kryo 265 Silver (Cortex-A55 기반) | 최대 1.9 GHz | 4개 |
| 4-7 | Kryo 265 Gold (Cortex-A76 기반) | 최대 2.4 GHz | 4개 |

### CPU 상세
- CPU part 0x801: Kryo 265 Silver (4개) - 효율 코어
- CPU part 0xd09: Kryo 265 Gold (4개) - 성능 코어
- Hardware: Qualcomm Technologies, Inc KHAJE

---

## 메모리 (RAM)

| 항목 | 용량 |
|------|------|
| **RAM 총량** | 3,675 MB (약 4GB) |
| **사용 가능** | 약 672MB |
| **캐시** | 약 728MB |

---

## 저장소

| 항목 | 용량 |
|------|------|
| **전체 용량** | 108GB (128GB 모델) |
| **사용 중** | 88GB (82%) |
| **남은 공간** | 20GB (18%) |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Adreno 610 |
| **OpenGL ES** | 3.2 |
| **OpenGL 버전 코드** | 196610 |

---

## 디스플레이

| 항목 | 사양 |
|------|------|
| **해상도** | 1080 x 2408 (FHD+) |
| **물리적 밀도** | 450 dpi |
| **화면 크기** | 6.6인치 |
| **화면 비율** | 20:9 |

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
| Samsung Galaxy A23 | Snapdragon 680 | 8코어 2.4GHz | 4GB | 스마트폰, 휴대성 |
| Lenovo TB310FU | MT8786 (Helio G80) | 8코어 2.0GHz | 4GB | 태블릿, 큰 화면 |

### 성능 차이
- **CPU 성능**: Galaxy A23 > Lenovo 태블릿 (클럭 속도 높음)
- **GPU 성능**: Adreno 610 vs Mali-G52 MC2 (유사한 수준)
- **저장소**: Galaxy A23 128GB > Lenovo 48GB

---

## 요약

미드레인지 스마트폰으로, AI OCR 및 센서 데이터 수집 프로젝트에 적합합니다.

- **장점**: 높은 CPU 클럭 속도, FHD+ 디스플레이, 큰 저장 공간
- **단점**: 사용 가능한 저장 공간 부족 (82% 사용 중)

---

## 센서 목록

이 기기에서 지원하는 센서 정보는 별도 문서 참조:
- `C:/todo/today/projects/smartphone_sensor/Samsung_Galaxy_A23_센서목록.md`

---

## 원본 데이터

### /proc/cpuinfo (요약)
```
processor   : 0-3  (CPU part: 0x801 - Kryo 265 Silver)
processor   : 4-7  (CPU part: 0xd09 - Kryo 265 Gold)
Hardware    : Qualcomm Technologies, Inc KHAJE
```

### getprop 정보
```
ro.product.model=SM-A235N
ro.product.brand=samsung
ro.build.version.release=14
ro.board.platform=bengal
ro.product.cpu.abi=arm64-v8a
ro.product.cpu.abilist=arm64-v8a,armeabi-v7a,armeabi
ro.hardware=qcom
```

### /proc/meminfo (요약)
```
MemTotal:        3675140 kB
MemFree:           69276 kB
MemAvailable:     687868 kB
```

---

*이 문서는 ADB를 통해 수집된 정보로 작성되었습니다.*
