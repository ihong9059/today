---
title: AI 시대 방향 판단
type: ai
created: 2026-04-19
updated: 2026-04-22
tags: [AI, 방향, 전략, 판단]
links: [me, ai-landscape, skills, goals, strengths, gaps]
---

# AI 시대 방향 판단

## 판단 로그 (2026-05-21) — uttechome-claude 8th multi-agent 합류 + 양방향 통신 확립 ⭐

**사건**: uttecHome vault 5/19 분리 후 Phase D `_inbox/` 미도입 상태로 5/15~5/20 동안 onDevice·wishket·lemonlabs 측 신기술·영업 자료 cascading 0건. 5/21 사용자 진단 → 옵션 A megasession.

**해소 정책**:
- uttechome-claude 5/21 8th 합류 (multi-agent 7 → 8 Claude 시스템). 영업 트랙 vault 첫 사례.
- CLAUDE.md send-only → 양방향 (송신 1~4 + 수신 5~8 + 자동 트리거)
- 새 vault 분리 시 `_inbox/` + 양방향 CLAUDE.md를 Phase A/B와 동시 도입 정책 박제 (memory `feedback_uttechome_inbox_required.md`)
- 외부 vault 카드 = 최우선 정책 (5/20) 효과 입증 — uttechome 8th 합류로 cascading 비대칭 해소

**판단 패턴**: vault 분리 시 통신 인프라(_inbox + check-inbox.py)와 정책(양방향 CLAUDE.md)을 동시 도입하지 않으면 N일 cascading 차단 위험. 5일치 5건 자료 미반영 사건 = 구조적 결함. 향후 새 vault 분리 시 본 패턴 반복 차단.

## 판단 로그 (2026-05-21) — Round 17·17.5 ESP-DSP 결정타 4건 ⭐⭐⭐

| # | decision | 근거 | 영향 |
|:-:|---|---|---|
| 1 | **AI FanStick 차세대 양산 방향 재전환 (5/8 잠금 폐기)** — C3 유지 → ESP32-S3-N16R8 + ESP-DSP + PSRAM SLM | Round 17: `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 24.8× | BOM C3 $1.5 → S3 $5~6 (3~4×), K-POP Premium 5~10만원 가격대 수용. 응답 ~150ms 자연스러움 보증 |
| 2 | **차세대 SLM sweet spot ≤ 500KB (SRAM 또는 작은 PSRAM)** | Round 17.5: TF 64 SRAM 10.8× vs TF 484 PSRAM 0.94× — PSRAM 가득 모델은 ESP-DSP 효과 무효 | Korean-Small 154K (~600KB) 적정. 1~5M params 적재는 PSRAM 큰 모델 가속 무효 영역 |
| 3 | **KWS wake word는 ESP-DSP 외 별도 가속 방안 (esp-nn 또는 TFLM esp-nn delegate)** | Round 17.5: CNN conv strided access는 dsps_dp_s8 직접 적용 불가 (im2col 필요) | AI FanStick KWS 트랙은 별도 라이브러리 검토 필요 |
| 4 | **C3 양산 보드에서 ESP-DSP 적용 = 손해, 칩 교체 (C3→S3) 동반 필수** | Round 17.5: esp32wroom 12셀 ansi fallback 1.54× 느림 검증. 함수 호출 + boundary check overhead | 양산 보드 펌웨어 ESP-DSP 적용 시 반드시 LX7 (S3) 동반 |

→ 매칭 패턴: [[2026-05-21_esp-dsp-3조건-매칭]] — LX7 AI Vector Instruction × 메모리 계층 × 접근 패턴 3조건 곱

## 사업 전환 선언 (2026-04-22)

> **기존 LED 조명제어 사업 → AI 3대 사업으로 전환**
> - 원인: 중국 저가 공세 + 국내 인프라 소멸 → 기존 사업 경쟁력 상실
> - 핵심 역량(무선 통신 + 임베디드 + 시스템 통합)은 보존, 적용 시장만 전환
> - 상세: [[2026-04-22_사업전환-AI시대]]

### AI 3대 사업 라인
| # | 사업 | 기존 자산 활용 | 핵심 차별점 |
|---|------|-------------|-----------|
| 1 | **AI 프로그래밍 교육** | 4 Track 커리큘럼, 사전빌드 272개, 영상 30편 | 하드웨어 연동 AI 교육 = 희소 |
| 2 | **AI 스마트팩토리** | 전시회 데모, 센서 웹, 85억 제안서 | 대기업 1/10 가격 + 정부보조금 |
| 3 | **AI 소형 제품** | FanStick 특허, BLE Mesh, 양산 5개 실적 | AI+HW 통합은 SW회사 불가 |

## 나의 현재 포지션

**AI 시대에 하드웨어와 소프트웨어를 연결하는 사업가**

- AI를 활용해 교육, 산업 시스템, 소형 제품을 만드는 회사(UTTEC) 대표
- 하드웨어(물리적 세계)와 소프트웨어(디지털 세계)의 연결점에 위치
- Claude Code를 일상 도구로 활용하여 1인 생산성 극대화
- 5개 양산 제품 운영 실적 + 일본 수출 3,800대 + KC/TELEC/CE 인증 보유

## 대체 위험 분석

### 높은 위험 (AI가 대체할 가능성)
| 영역 | 위험도 | 대응 |
|------|--------|------|
| 단순 웹/앱 개발 | 매우 높음 | Claude가 웹사이트를 거의 혼자 만듦. 하드웨어 연동 차별화 필수 |
| 코딩 문법 교육 | 높음 | "AI와 협업하는 교육"으로 전환 (Python Vibe) |
| 문서/보고서 작성 | 높음 | 이미 AI 활용 중 (위협이 아닌 도구) |
| 데모 사이트 제작 | 높음 | Three.js 3D 데모 25개를 AI가 만들 수 있음 |
| 제안서/지원서 작성 | 중간 | 도메인 전문성 + 양산 실적이 차별화 |

### 낮은 위험 (인간이 여전히 필요)
| 영역 | 이유 |
|------|------|
| 하드웨어 디버깅 | 물리적 제약, 실제 보드 조작, 오실로스코프 |
| 교육 현장 운영 | 학생과의 상호작용, 동기부여, 실시간 대응 |
| 시스템 통합 | 하드웨어 + 소프트웨어 + 네트워크 + 인프라 통합 판단 |
| 양산 품질 관리 | 실제 제품의 물리적 검증, 환경 테스트 |
| 고객 요구사항 파악 | 도메인 이해, 소통, 신뢰 관계 |
| KC/안전 인증 | 규제 대응, 실물 테스트 |

## 증폭 기회 (AI로 10배)

1. **사전빌드 시스템**: AI 프롬프트→펌웨어 코드→자동 빌드→OTA (이미 272개 구현)
2. **교육 콘텐츠 대량 생산**: Remotion+edge-tts로 영상 30편, 100개 예시 코드 하루 만에 완성
3. **프리랜서 생산성**: Claude Code로 제안서+코드+문서 동시 생산
4. **바이브 코딩 교육**: AI 시대의 새로운 교육 방식 선점
5. **영업 자료 자동화**: 데모 사이트 25개, 회사소개서 4종 빠르게 생산

## 유니크 가치 (AI가 대체 불가)

- **하드웨어 + 소프트웨어 수직 통합**: 회로 → 펌웨어 → 서버 → 앱 → 웹 전체 스택
- **5개 양산 제품 운영 실적**: 프로토타입이 아닌 실제 판매 중인 제품
- **교육 현장 경험**: 실제 학생에게 가르친 경험에서 오는 교육 설계 능력
- **도메인 통합력**: IoT + 교육 + AI를 하나의 제품으로 엮는 능력
- **38년 임베디드 경력**: 깊이와 폭에서 AI가 대체 불가

## 학습 우선순위

### 지금 배워야 하는 것
1. AI 에이전트 프레임워크 (Claude Agent SDK 등)
2. MCP 서버 개발 (AI 도구 연동)
3. 온디바이스 AI (Jetson, 엣지 추론)

### 나중에 배워도 되는 것
- 딥러닝 모델 학습/파인튜닝 (도구 활용으로 충분)
- 프론트엔드 프레임워크 최신 트렌드 (AI가 대신 작성)
- Rust (기존 C/C++ + Python으로 충분)

## 전략적 방향 (2026-04-22 재정의)

```
[과거] LED 무선 조명제어 시스템 (BLE Mesh → LoRa)
         ↓  ← 중국 저가 + 인프라 소멸로 전환
[현재] AI 3대 사업 기반 구축
         ↓
[중기] AI 교육 상용화 + 스마트팩토리 첫 고객 확보 + 소형 제품 MVP
         ↓
[장기] "AI + 하드웨어 통합 솔루션" 전문 기업
```

### 기술 진화 연속성
```
LED 무선 제어 (BLE Mesh, 2016~2023)
  → IoT 센서 제어 (LoRa, REVITA, 2024~)
    → AI 예측정비 (스마트팩토리, 2025~)
      → AI 교육 + AI 제품 (2026~)
```
**기술이 바뀐 게 아니라, 적용 시장이 바뀌는 것.**

## 판단 로그

| 날짜 | 판단 | 근거 | 결과 |
|------|------|------|------|
| 2025-12 | Next.js+AWS로 교육 플랫폼 시작 | 온라인 교육 수요 + 기술 역량 | 운영 중 ✅ |
| 2025-12 | Flutter 선택 (BLE 앱) | 크로스 플랫폼, flutter_blue_plus | 표준 정착 ✅ |
| 2026-01 | EasyOCR 표준 엔진 채택 | Tesseract(20%) 대비 90% 인식률 | 완료 ✅ |
| 2026-01 | RPi5 자체 호스팅 전환 | AWS EC2 MFA 문제, 비용 절감 | DO로 재전환 |
| 2026-02 | AI FanStick 블루오션 확인 | 시장에 AI 통합 응원봉 없음 | 특허 출원 ✅ |
| 2026-02 | Claude Code Skill 시스템 정립 | 반복 워크플로우 자동화 | 활용 중 ✅ |
| 2026-03 | Remotion 교육 영상 표준화 | edge-tts + 자동 렌더링 파이프라인 | 30편+ 제작 ✅ |
| 2026-03 | 위시캣 회사명 마스킹 필수 | 페널티 위험 | 적용 중 ✅ |
| 2026-04 | ESP-IDF→Arduino 전환 | 교육 적합성, AI 코드 생성 정확도 | 성공 ✅ |
| 2026-04 | Haiku→Sonnet 전환 | 1차 빌드 성공률 향상 | 성공 ✅ |
| 2026-04 | Kotlin→Flutter 단일화 | 하나의 코드베이스로 생산성 극대화 | 성공 ✅ |
| 2026-04 | 바이브 코딩 교육 시작 | AI가 코드 생성하는 시대, 문법보다 AI 활용 | 진행 중 |
| 2026-04 | 사전빌드 시스템 우선 | 교육 현장 즉시 체험 = 핵심 차별화 | 272개 완료 ✅ |
| 2026-04 | 사전빌드 DB 방식 | 빌드 시간 270초→18초 목표 | 진행 중 |
| 2026-04-19 | Claude Design 발견 | Figma+Claude Code 조합 불필요, Claude Design이 디자인 직접 생성 | 방향 전환 |
| 2026-04-19 | Figma MCP 학습 보류 | Claude Design이 더 간단하고 통합적, Figma는 필요 시에만 | 판단 완료 |
| 2026-04-22 | **LED 사업→AI 3대 사업 전환** | 중국 저가 공세+국내 인프라 소멸로 기존 경쟁력 상실. 핵심 역량은 보존, 시장만 전환 | 전환 선언 |
| 2026-04-22 | AI 교육을 1순위 사업으로 | 기존 자산(커리큘럼, 영상, 사전빌드) 활용 가능, 수익화까지 거리 짧음 | 진행 중 |
| 2026-04-22 | 스마트팩토리를 2순위로 | 영업 주기 길지만 단가 높음, 정부보조금 연계 가능 | 기반 구축 중 |
| 2026-04-22 | AI 소형 제품을 3순위로 | FanStick 특허 확보, 양산 경험 있지만 자금/시간 필요 | MVP 단계 |
| 2026-05-07 | 통신 프로토콜 포팅 사업 라인 가능성 발견 | OOK 두 응용 영역(공중파 + RF feeder in-band) + 4종 양산 통합 → 7종 직접 경험. 위시캣 #155057 [[aisg]] 분석에서 도출 | 검증 중 ([[2026-05-07_OOK-두-응용-영역]]) |
| 2026-05-07 | 위키 영업 자산 발견 워크플로우 시스템화 결정 | 1일 2건(#155057/#155091) 누락 자산 발견 패턴 재현, 다른 도메인에서도 일관 → 도메인-독립적 시스템 결함 입증. /wishket-apply 스킬에 myWiki 선검색 단계 추가 결정 | 시스템 개선 진행 |
| 2026-05-07 | obsidian 시리즈 첫 시범 미포함 결정 (옵션 D) | 시범 Day 4·5는 Track D+E로 8h씩 채워져 시간 충돌 + Track F 미포함 패턴(시나리오 C)과 일관성. 첫 시범은 13가이드 검증 우선. obsidian 시리즈는 별도 단기 모듈(2~3h)로 분리 → 호오컨설팅·인프런·디지털배움터 차별화로 다각 활용. 2차 차수 통합 검토 | 결정 ([[obsidian-시리즈-사업화]]) |
| 2026-05-07 | 3.5-Stage → 4.5-Stage 패키지 확장 (Stage 4 On-Device AI 신설) | 사용자 강점(임베디드 38년 + AI 통합) + 시장 트렌드(Hailo·Jetson·SLM) + microGPT 검증으로 타당성 입증. 단가 1,500만/4주, 매출 5,800만→7,300만(+26%). Stage 0 견적서 옵션 섹션 갱신. 첫 수주 후보: 한국기계 Hailo-8 예측정비 | 결정 ([[uttec-stage-package]]) |
| 2026-05-12 | **위키 ingest 누락 방지 3계층 자동화 패턴 채택** | revitaProject Claude의 SessionStart hook + work-start 강화 + `_remote-cache/`. "수동 절차의 자동 1차 방어선 + 정밀 분류 + 심층 분석 도구" 패턴 → Claude 협업 전반에 적용 가능. myWiki에도 multi-agent `_inbox/` + `check-inbox.py` 같은 패턴으로 확장 (사용자 broker 부담 0) | 가동 중 ([[revita]] / `myWiki/_inbox/PROTOCOL.md`) |
| 2026-05-12 | **원격 모니터링 풀스택 = 사업 라인 발견** | Solar Monitor (RAK4631 + INA219 + LoRa SF12 + Flask + Chart.js + systemd) ↔ [[한림용인cc-고가수조]] (1,000만원 시공 직전) 동일 아키텍처 확인. "센서→LoRa→RPi Flask Web UI→현장 운용"이 농업·양식·산업 시설로 확장 가능 | 실증 진행 중 ([[2026-05-12_원격모니터링-사업라인]]) |
| 2026-05-15 | **제품별 vault 통합 패턴 채택 (3-vault → 2-vault)** | onDevice_AI vault에 구 uttecBizWiki(비즈니스 전용 vault) 흡수 → 한 제품(AI FanStick + Stage 4)의 기술 검증과 비즈니스 운영을 같은 vault에서 일직선 추적. cross-link 비용 단순화. revita 패턴(별도 private repo + multi-agent)을 적용해 ondevice-claude 합류 (3 Claude 시스템). 통합 vault가 검증 모델 — 차후 다른 제품 라인에도 동일 패턴 적용 가능 | 가동 중 ([[onDevice-ai]] / `_inbox/PROTOCOL.md` 합의 이력 5/15) |
| 2026-05-15 | **n8n 표준 = Docker (npm install 비표준화)** | Ubuntu에 npm 글로벌 n8n 설치 시 Node 20 호환 마지막 버전(2.8.4)으로 silent downgrade 발견 → Docker 컨테이너(n8n 2.20.7-exp.0 / Node v24)로 마이그레이션. odroidc2(교육)와 Ubuntu(실전) 둘 다 Docker로 일관성 — 워크플로우 마이그레이션 호환 + Node 격리. 향후 n8n 신규 서버는 무조건 Docker 1순위 | 표준 정착 (`/todo/today/n8n/`, Tailscale 100.90.158.36:5678) |
| 2026-05-17 | **onDevice_AI 1차 mandate 전환 — Phase 1~4 → 보드한계모델 strand** | 옛 "AI FanStick + Stage 4 영업 4 Phase 12 실험"은 검증 자산 흩어짐. 새 "보드한계모델 21셀 측정 (5보드 → 13보드 확장 시 37셀)" 단일 strand로 통합 → 단일 출처 `0_마스터플랜.md v2.0`. 응용·영업은 W6 종료 후 C 단계 분리. Stage 4 영업 자산화 시점 6/29로 명확화 | 진행 중 ([[onDevice-ai]] 78% 진행) |
| 2026-05-17 | **vault scope 결정 — 추론 전용 + synthetic random weights** | 보드한계모델 mandate v2 확정 — weight 의미와 무관, 메모리·연산 envelope만 측정. 학습 0회. 이전 v1 "학습+포팅+추론"은 노이즈. 추론 전용으로 단순화 + 결과 비교 가능성 향상. 13보드 동일 schema 통일 (`pc/` 5+1 분할 양식) | 표준 정착 |
| 2026-05-18 | **응원봉 SLM 최종 권장 사양 확정 (INT8 + ESP-DSP + ~100K)** | 18 PC-only baseline 측정 결과: INT8(FP32 51% 사이즈) + 1s threshold + single-core + **ESP-DSP dotprod**(AVX2 1.8~2.0× 추정) + ~100K params. **Korean-Small 154K 적합 ✅**(esp32s3 SRAM 30%, ESP-DSP 활성 시 300ms). dual-core 효과 1.1× → SIMD 우선. → [[ai-fanstick]] 차세대 BOM 영향 0 (칩 변경 불필요) | 결정 ([[ai-fanstick]] 갱신) |
| 2026-05-19 | **Round 9 발견 — Xtensa LX7 plain C는 ARM 9~38× 느림** ⭐ | esp32s3 메인 타겟 측정 결과 의외 발견: MLP 1024 9~10×, CNN 32 12~25×, TF 484 6.9~38×. 원인: INT8 명시 SIMD intrinsics 미사용 mandate + PSRAM access overhead. 차세대 펌웨어는 ESP-DSP / ESP-DL dotprod 명시 필수. Stage 4 영업 자료에 "Xtensa SIMD 활성 시 N× 가속 보증" 카피 가치 | 결정 ([[onDevice-ai]] Round 9) |
| 2026-05-20 | **Round 10·11 발견 — RISC-V vs Xtensa 동급, PSRAM이 결정타** ⭐⭐ | esp32c6(RISC-V single 160MHz + PSRAM 없음) 측정으로 두 가설 확정: (1) RISC-V plain C는 Xtensa LX7과 클럭 normalize 시 동급(CNN 32 1.5× 우위), (2) **PSRAM 유무가 mandate RAM_safe 셀 결정타** (esp32c6 3 ↔ esp32s3 5 = 60% 격차). → 차세대 BOM 의사결정에서 PSRAM 포함은 모델 크기 한계 직결. AI FanStick + Stage 4 영업 카피 갱신 필요 | 결정 (W6 종합 비교 6/22~28 후 자산화) |
| 2026-05-20 | **inbox lifecycle 정책 박제 — strikethrough = 5단계 완료만 허용** | 5/17~19 onDevice 카드 6장 발송됐으나 mywiki-claude가 lifecycle 5단계 흡수를 한 번도 수행하지 않은 채 작업보고서에 ~~strikethrough~~ 표시만 한 사건 박제. 원인 3건: (1) megasession 4 트랙 동시 진행으로 후순위, (2) strikethrough 의미 혼용, (3) 자동 트리거 부재. 대응: memory `feedback_inbox_lifecycle.md` 신설 + work-start SKILL pending ≥ 5 강제 권고 + raw/ junction 정합성 hook 신설 | 정책 정착 (memory + work-start SKILL) |
| 2026-05-20 | **외부 vault 카드 = 최우선 정책 ⭐** | 사용자 5/20 명시 지시. 외부 vault에서 도착한 카드가 1장이라도 있으면 다음 prompt 디폴트 작업 = 흡수. memory `feedback_inbox_lifecycle.md` 규칙 2 강화 (5장 → 1장 임계치) + work-start SKILL § 1-C 표 갱신. Claude가 "다음 뭐 할까요?" 결정 prompt 시 외부 카드 흡수를 첫 옵션으로 제시 의무. | 정책 정착 (memory + SKILL) |
| 2026-05-20 | **myWiki/raw/ 19 junction 일괄 복구** | schema CLAUDE.md vs 실제 상태 큰 불일치 (raw/onDevice_AI만 존재, 나머지 18 부재). 위시캣·작업보고서·영업·cuda·doctor·smartFactory·tailscale·xerix·webServer·응원봉·notion·유투브·동영상·ffmpeg·skill·전시회·revitaProject·회사소개·multiCore 19개 New-Item Junction으로 일괄 복구. check-raw-junctions.py로 향후 검증. 본 부채는 vault 분리(uttecHome 5/19) + onDevice 5/15 위치 변경 때 누적된 것. | 정합성 복구 완료 |
| 2026-05-20 | **사업 트랙 vault 정립 — 제품·학습·자동화·사업·시험 5축** | wishket-claude(사업 트랙 vault 첫 사례, 5/16 합류) + lemonlabs-claude(창업 트랙, 5/19) 합류로 vault 분류 5축 정립: (1) **제품 트랙** = revita·onDevice·uttecHome, (2) **자동화 트랙** = n8n-uttec, (3) **사업 트랙** = wishket, (4) **창업 트랙** = lemonLabs, (5) **시험 트랙** = shield. 7 Claude multi-agent 시스템. myWikiSetup 시나리오 D 4 사례 누적 (분산 호스트 Windows × 4 + Linux × 2 + RPi × 1) | 7 vault 가동 중 |
| 2026-05-20 | **Tier 3 정부사업 단순화 안 표준 (Node-RED + 양산 BOM 매칭)** | 위시캣 #155360(2.4억·120일·17명 경쟁) 지원 준비에서 정립. 풀스택 외주 ~3,000만 절감 + 양산 5종 BOM = 정부 R&D 정산 양식 95% 일치(17명 경쟁 결정적 차별화) + 일본 BLE Mesh 3,800대 = IoT 인프라 매칭 자산(2회 활용). 향후 ≥5,000만 Tier 3 위시캣 지원 시 본 패턴 재사용. | 표준 정착 (영업전략.md + 건물통합관제플랫폼.md) |
| 2026-05-20 | **분기 정부지원 점검 SOP 신설 (5 채널)** | lemonLabs ingest로 입증된 1.5개월 지연 사업 2건 발견 (3/31 멤버십·3/26 예비창업패키지). 분기 1회 5 채널 sweep(bizinfo·K-Startup·서울시 창업허브·스타트업플러스·혁신의숲) → 활성 vault 4 트랙 매칭 식별 → 폴더 신설 → mywiki 발견 카드 발송. 다음 점검 = 2026-06-22 또는 Q3 시작 7/1. | SOP 정착 (영업전략.md) |
| 2026-05-20 | **shield × n8n 책임 분리 = 시공 자산화 사업 라인 1순위** | shield(RPi hardware 측정) ↔ n8n(자동화 허브) = "측정 책임 vs 통신·기록 책임" 분리 패턴. 한림용인CC 고가수조 8노드(I2C 수위 + LoRa) = UTTEC **턴키 사업 모델 1순위**(시공 + 운영 SLA). n8n MQTT Trigger → Notion DB + Gmail + 시공 D-day. | 사업 라인 확정 (shield + 한림용인CC + n8n-uttec entity) |
| 2026-05-21 | **위시캣 지원서 클라이언트 본문 표준 3개 룰 박제** ⭐ | wishket-claude #155517+#155539 작성 중 사용자 지적 cascade 3건 → 영구 룰화. (1) 클라이언트 본문만 / 내부 메타 표현 금지 (본 vault·wishket-claude·강 매칭·솔직 약점·박제 등 0건), (2) 위시캣·타 프로젝트 번호 마스킹, (3) 솔직 약점 명시 전 사용자 자산 확인. grep 자가 검증 SOP 제출 전 0 hit 필수. wishketProject memory 3건 신설 + myWiki 위시캣활동 entity 박제. | 표준 정착 (wishketProject memory 3건 + [[위시캣활동]] § 5/21 megasession) |
| 2026-05-21 | **본 vault 자산 인덱스 완전성 함정 박제** ⭐⭐ | 5/20 정부 R&D 1억 + 5/21 nRF52832 USB 시리얼 = 2건 연속 사용자 직접 지적으로 자산 누락 발견. 본 vault 자가 검증으로는 완전성 미보장 입증. 회피책: 룰 3 (약점 단정 전 사용자 confirm) + work-end 정기 자산 점검 SOP 신설 권장 + wishket-apply 스킬에 사용자 confirm 단계 검토. 강사양성·obsidian 시리즈 강의 직접 자산. | 함정 박제 ([[gaps]] § 자산 인덱스 완전성 + [[2026-05-21_자산-인덱스-완전성-함정]] thought) |
| 2026-05-21 | **search vault 9th Tier 3 분리 + Claude Max CLI subprocess 패턴** ⭐ | myWiki second-brain 위 prompt-driven 검색·정리·요약 web 서비스 vault 신설 (`C:/todo/search/`). **사용자 노출 트랙 vault 첫 사례** (제품 5 + 사업 1 + 창업 1 + 영업 1 + 노출 1 = 9 vault / 9 Claude). FastAPI + React + Vite + Tailwind. **Anthropic SDK API key 폐기 → `claude --print` subprocess (Max OAuth) 패턴** — 다른 vault backend 도 동일 패턴 재사용 가능. junction 루프 버그 → `.gitignore raw/` 차단 박제. | 9 vault 가동 ([[search]] + search/_inbox/PROTOCOL.md) |
| 2026-05-22 | **search ↔ today 메모리 공유 정책 예외** | 다른 4-vault 메모리 격리 정책과 다른 예외. `~/.claude/projects/C--todo-search/memory/` → `today/.claude/memory/` junction. 사용자 의도: search vault 가 today 와 거의 동일한 수준의 web service 로 운영되도록 비교 가능. 글로벌 룰 (사용자 본명·위시캣·5-vault·Notion 정책) 공유. search 측 `setup-memory-sync.py` (idempotent) + vault-start Step V0 자동 검증. | 정책 정착 ([[search]] § 메모리 공유) |
| 2026-05-22 | **Mobile NPU NNAPI 불사용 — Stage 4 칩 선택 결정타** ⭐⭐⭐ | Galaxy A51 5G Eden NPU 측정: plain INT8 MLP 128~16384 전 범위에서 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**. "Mobile NPU 항상 빠르다" 통념 정량 반증. Stage 4 패키지 mobile NPU 적극 제안 X — MCU 가속 (ESP-DSP / CMSIS-NN) 매트릭스로 영업 전개. 본 vault skeleton (mlp/cnn/transformer + batch=1 + plain INT8) application class 정의: ✅ MCU 가속 5~25× / ⚠️ Mobile NPU 손해 / ✅ CPU SIMD (NDK clang `-O2` asimddp). | 결정 ([[onDevice-ai]] / [[ai-fanstick]] / [[uttec-stage-package]] 영업 메시지 + [[2026-05-22_npu-vendor-광고-실측-격차]] thought) |
| 2026-05-22 | **Vendor 광고 vs 실측 격차 — 벤치마크 우선 원칙** | Round 19 NNAPI 79~421× 손해는 매칭 패턴 결정타 사례. Samsung Eden NPU 2.1 TOPS 광고 vs plain INT8 small dense layer 실측 손해. 일반화: vendor 광고 = best-case 기준 → application class 다르면 손해로 뒤집힘. 적용: 위시캣 영업 NPU 요청 시 application class 사전 확인 / 강사양성 Day 5 비교 사례 / REVITA 모바일 응용 검토. | 원칙 박제 ([[2026-05-22_npu-vendor-광고-실측-격차]] thought) |

## 위시캣 시장 인사이트

### 시장 현실
- 위시캣은 웹/앱/디자인/PM 프로젝트가 대다수
- 임베디드/IoT/펌웨어는 소수 (전체의 5% 미만 추정)
- 매칭 프로젝트 출현 빈도: 주 0~2건
- 2~4월간 328건+ 검토, 16건+ 지원

### 차별화 전략
- "38년 경력 + 5개 양산 제품" = 핵심 브랜딩
- HW+SW 통합 역량 (회로 25년 + 펌웨어 38년)
- 삼성전자/파나소닉 대기업 경력 → 신뢰성
- 라이브 포트폴리오 URL (uttec-sensor.duckdns.org)

### 지원서 진화
- 2월: 단순 스킬 매칭
- 3월: 시스템 아키텍처 다이어그램, 매칭률 테이블 도입
- 4월: 갭 분석 포함, 정직한 약점 인정 + 학습 계획

## 관련 페이지
- [[me]]: 나는 누구인가
- [[ai-landscape]]: AI 기술 지형도
- [[skills]]: 현재 보유 기술
- [[goals]]: 목표와 방향
- [[strengths]]: 강점 분석
- [[gaps]]: 부족한 부분
