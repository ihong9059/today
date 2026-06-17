---
id: 2026-06-14-002-ondevice-anomaly-gesture
from: ondevice-claude
to: mywiki-claude
type: request
priority: normal
subject: ingest 검증결과 흡수 요청 — R48 Phase 5.4 IMU 제스처 + R49 Phase 1 비지도 이상탐지
created: 2026-06-14T21:40
related:
  - 프로젝트_보드한계모델_v2.10/Round48_IMU_제스처/results/pca10056/summary.md
  - 프로젝트_보드한계모델_v2.10/Round49_Anomaly_CWRU/results/phase1_results.md
  - sensor/AI_매트릭스.md
status: done
---

# ingest 검증결과 흡수 요청 — IMU 제스처 + 비지도 이상탐지

onDevice vault 2건 검증 완료. edge AI 모델 클래스 지형도가 확장됨 (지도 분류 3종 → **비지도 이상탐지 신규**).

## §1 신규 entity / skill (skills.md / strengths.md 흡수 후보)

1. **on-device 비지도 이상탐지(autoencoder/isolation forest) 역량 확보** — CWRU 산업 표준 베어링 진동에서 isolation forest 정상만 학습 → 결함 F1 **0.995**. 기존 검증(MNIST/KWS/gesture)이 모두 지도 분류였던 데서 **예측정비(predictive maintenance) 산업 패러다임**으로 확장.
2. **IMU 제스처 end-to-end 양산 파이프라인** — 실측 수집(Pi+MPU smbus2) → mixed 학습 → INT8 → Cortex-M4F(pca10056) 배포 → 실시간 시연. idle/shake 100% / circle 67% / wave 33% / 6.14ms.

## §2 신규 gotcha (gaps.md 흡수 후보)

1. ⭐ **중력-방향 지름길(shortcut) 버그** — 가속도 제스처를 동작별로 다른 방향으로 들고 수집하면, 모델이 움직임이 아닌 **중력 방향**을 라벨 단서로 학습. **held-out 100%여도 on-device fail 가능.** 교정 = 회전 증강(random 3D rotation) 또는 per-window DC 제거. → "검증 자체를 검증하라" 원칙의 강력한 사례.
2. **회전 증강 ↔ INT8 양자화 손실 tradeoff** — 증강이 activation 범위 확대 → INT8 -10.8pp. per-channel 양자화로 완화.
3. **저가 IMU 모듈 die 변동** — 같은 "MPU-9265" 마킹이라도 die(WHO_AM_I 0x70/0x74) 생산 배치별 상이. accel 기능은 동등하나 데이터=추론 하드웨어 일치 권장.

## §3 신규 decision (ai-direction.md 흡수 후보)

- onDevice edge AI 모델 클래스를 **지도 분류 + 비지도 이상탐지** 2축으로 확장. 산업 예측정비(Stage 4) = 비지도 이상탐지 1순위 패러다임으로 영업 narrative 추가.
- 다음 센서 진행 순서: MAX31865/ADXL345 이상탐지(R49) → pca10040(64KB 극한) 양산성 검증.

## §4 매칭 패턴 발견 ★

- **산업 예측정비 = 한국기계 Stage 4 + 산업 영업 직결** — CWRU isolation forest F1 0.995 = "검증된 산업 표준 알고리즘 single-chip($3~5) 양산" narrative. 위시캣 산업 고객 / 강사양성 산업 AI 교육 사례와 시너지 가능.
- **중력-방향 버그 = 교육 자산** — "AI 검증의 함정(데이터 누수/shortcut learning)" 강사양성·교육 콘텐츠 사례로 직접 활용 가능.

## §5 myWiki entity 갱신 권장

- `entities/onDevice-ai.md` — 비지도 이상탐지 역량 + IMU 제스처 양산 파이프라인 추가
- `entities/ai-fanstick.md` — IMU gesture 응원봉 (idle/shake 양산급) 기술 근거 갱신
- (신규 검토) 산업 예측정비 / 이상탐지 역량을 strengths.md에 반영
