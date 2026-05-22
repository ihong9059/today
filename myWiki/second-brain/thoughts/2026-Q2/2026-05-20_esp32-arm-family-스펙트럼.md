---
title: ESP32·ARM 패밀리 8년 진화 46× 스펙트럼 — Round 1~11 종합
type: thought
created: 2026-05-20
updated: 2026-05-20
tags: [onDevice, 측정, ARM, Xtensa, RISC-V, PSRAM, Stage4, 강사양성, 매칭패턴]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, ai-direction, gaps, uttec-edu]
---

# ESP32·ARM 패밀리 8년 진화 46× 스펙트럼 — Round 1~11 종합

## 사실 A — onDevice_AI vault 5/17~20 보드한계모델 측정

5일 사이 10보드 119셀 측정 누적. 같은 CNN 128 셀(376KB INT8) 측정으로 8보드 1줄 정렬:

| 순위 | 보드 | median_us | uttecMac ratio | 환경 키 |
|:-:|---|---:|---:|---|
| 1 🥇 | smartphone | 48,800 | **0.58×** | A77 + clang + NPU 무관 |
| 2 | tablet | 89,800 | 1.07× | A75 + clang |
| 3 | uttecMac | 83,640 | **1.00× baseline** | Haswell + Linux + gcc 11.4 |
| 4 | pc-windows | 193,950 | 2.32× | Haswell + Win11 + MSYS2 gcc |
| 5 | rpi5 | 158,318 | 1.89× | A76 + gcc 14.2 + asimddp |
| 6 | rpi4 | 342,399 | 4.09× | A72 + gcc 14.2 + asimddp 없음 |
| 7 | **rpi3** | 1,705,013 | **20.32×** | A53 in-order |
| 8 | **rpizero** | 2,229,761 | **26.65×** | **ARMv6 single + NEON 없음** |

스펙트럼: **smartphone(0.58×) → rpizero(26.65×) = 46×**. **8년 ARM 진화의 측정값 박제**.

## 사실 B — esp32s3·esp32c6 추가로 ARM 외 아키텍처 비교

| Round | 발견 | 의미 |
|:-:|---|---|
| 9 | **Xtensa LX7 plain C는 ARM 대비 9~38× 느림** | SIMD intrinsics 미사용 시. PSRAM access overhead. 차세대 펌웨어는 ESP-DSP dotprod 명시 필수. |
| 10 | RISC-V plain C는 Xtensa LX7과 클럭 normalize 시 동급 | esp32c6(160MHz) ↔ esp32s3(240MHz) 시간 0.97~1.36×. CNN 32 RISC-V **1.5× 우위**. |
| 11 ⭐ | **PSRAM 유무 = mandate RAM_safe 셀 결정타** | esp32c6(없음) 3 RAM_safe ↔ esp32s3(8MB) 5 RAM_safe = **60% 격차**. MLP 1024+ / TF 484+ 모두 esp32c6 wall. |

## 판단 C — 측정 과학의 진행 과정 자체가 자산

Round 1~11 가설 변천(11회 반증·정제)이 **측정 과학의 모범 사례**. 매 보드 추가 시 가설이 정제되는 ablation 진행:

1. R1: artifact 가설 → 측정 버그 발견 (uninitialized stack)
2. R2: i586-tune SIMD → 반증 (rpi5에 i586 무관)
3. R3: L3 cache → 부분 반증 (clang으로 가려짐)
4. R4: clang vs gcc → 2.2× 확정
5. R5: + ARM 코어 세대 clang → 1.85× 분리
6. R6: + 같은 gcc 1세대 → 1.75× + L3 cache +0.41× 부활
7. R7: + ARMv8 1세대 little vs big → 3.0~3.8×
8. R8: + ARMv6 vs ARMv8 + NEON + single → 2.0~2.7×
9. R9: + Xtensa LX7 → 9~38× 의외
10. R10: + RISC-V vs Xtensa → 동급
11. R11: + PSRAM 유무 → 결정타

**"같은 코드, 같은 mandate, 다른 보드 = 46× 차이"**. 컴파일러·아키텍처·세대·SIMD·메모리 5축 단독 분리가 11회에 걸쳐 완성.

## 행동 D — 다른 트랙으로의 cascade

### D1. Stage 4 영업 카피 정량화 (6/29 자산화)

[[uttec-stage-package]] 시나리오 C(임베디드 신생기업) 영업 메시지:
- "1인이 4주에 → 1인 1일 18셀 sweep" (5/19 실증)
- "MCU급 SLM 추론 1초 안" — esp32s3 + PSRAM에서 MLP 1024 96ms / CNN 32 547ms / TF 484 255ms
- "보드/컴파일러 선택 = 8× 차이" 결정적 메시지
- "외부 의존성 0 ANSI C 820줄 추론 코드 자체 보유"

### D2. AI FanStick 차세대 BOM 결정 (6/29 cascade)

[[ai-fanstick]] 차세대:
- Korean-Small 154K (150KB) → esp32s3 SRAM 30% 적합 ✅
- 칩 변경 불필요 (양산 BOM 영향 0)
- 펌웨어는 ESP-DSP dotprod 명시 필수 (Xtensa 9~38× 회피)
- PSRAM 포함 칩 선택 = 모델 크기 한계 결정

### D3. 강사양성 Day 5 사례 (호오컨설팅·인프런·인포러닝 동시 활용)

[[uttec-edu]] (예정) Track F 보강 자료:
- "측정 결과 단일 원인 단정 위험" — Round 1·2 artifact·i586 가설 반증 사례
- "ablation 변수 통제 환경 셋업" — 6-way 환경 7.8× 차이 분해 → 컴파일러 + ARM 세대 + cache 단독 분리
- "1인 시공 빌드 함정 패턴" — gaps.md 임베디드 측정·빌드 함정 17건 사례
- onDevice_AI `education/` 13 파일 (3Blue1Brown 한국어 재구성) + 보드한계모델 비교표 그대로 활용 가능

### D4. 위시캣 임베디드 견적 자산

위시캣 임베디드 IoT 공고에서 인용 가능:
- 본 vault `src/` ANSI C99 820줄 = "양산 운영 자산"
- 본 vault 13보드 한계표 = "포트폴리오 + 검증 능력 증명"
- 1주 미만 새 머신 진입 (3 머신 1일 = sshkey + bundle 셋업 워크플로우)

## 매칭 패턴 — 본 측정 방법론의 다른 vault 적용

본 vault의 "synthetic random weights + binary search wall finding + schema 통일" 방법론은 다른 트랙에도 적용 가능:

1. **revita LoRa 전력 측정** — 정해진 자원에서 한계 찾기 (배터리 vs 송신 주기 envelope)
2. **shield IoT 디바이스 검증** — 보드별 양산 가능 영역 정량화
3. **한림용인CC 시공 측정** — RSSI 거리별 envelope (5/19 LoRa v2.1 측정 패턴 미러)

→ "정해진 mandate + ablation + cascade 갱신"이 **임베디드 측정 메서드의 일반 패턴**.

## 본 인사이트 박제 의미

본 패턴 발견 = **검증 사이클 자체가 영업 자산이 되는 첫 사례**. Stage 4 시나리오 C 카피의 정량 보증 데이터를 6주(W0~W6) 동안 누적하는 것은 [[strengths]] "폭발적 실행 속도"가 검증 사이클로 표현된 모범 사례. 다른 제품 라인에도 동일 패턴 적용 가능:
- AI FanStick 외 → 양산 BOM 결정 정량 자료
- Stage 0 견적서 외 → 검증 단계별 영업 자산화
- 강사양성 외 → 측정 방법론 강의 모듈

## 본 박제와 정지선

[[2026-05-08_응원봉-온디바이스AI-정지선]]는 응원봉 양산 트랙의 정지선. 본 측정 결과는 **PR·B2B·강의 트랙 자산**으로 정지선 영향 없음. 두 트랙 분리 유효.

## 관련 페이지

- [[onDevice-ai]] — 본 vault, 78% 진행
- [[ai-fanstick]] — 본 측정 결과 흡수 5/20
- [[uttec-stage-package]] — Stage 4 카피 6/29 정량 자산화
- [[ai-direction]] — Round 9·10·11 판단 로그
- [[gaps]] — 임베디드 측정·빌드 함정 17건
- [[uttec-edu]] (예정) — 강사양성 Day 5 사례
- [[2026-05-08_응원봉-온디바이스AI-정지선]]

## 메타

| 항목 | 값 |
|---|---|
| 박제 일자 | 2026-05-20 |
| 트리거 | ondevice-claude 카드 6장 + 5/20 새벽 esp32c6/Round 10·11 일괄 흡수 megasession |
| 다음 진행 | W6 종료 6/22~28 → 04_종합_비교.md → 6/29 Stage 4 자산화 |
| Stage 4 영업 첫 수주 후보 | 한국기계 / 임베디드 스타트업 / tablet 키오스크 시장 |
