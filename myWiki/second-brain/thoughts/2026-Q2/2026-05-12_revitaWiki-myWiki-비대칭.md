---
title: revitaWiki → myWiki 비대칭 — 한 바퀴만 잘 도는 복리 엔진
type: thought
created: 2026-05-12
updated: 2026-05-12
tags: [meta, wiki-system, ingest, compound-growth, gap, second-brain]
links: [revita, aisg, ai-direction, ingest-absorption-policy]
---

# revitaWiki → myWiki 비대칭

## 한 줄 결론

> **revitaWiki는 자료를 잘 축적하지만, 그 자료의 약 90%가 myWiki의 사업 자산으로 전환되지 않는 상태. 흡수 사이클이 명시적이지 않은 게 원인.**

## 트리거

2026-05-12 remocon 폴더 동기 작업 끝에 사용자가 던진 메타 질문:
> "C:\todo\revitaProject 에서 반영된 wiki가 myWiki가 지향하는 wiki에 자료나 방향을 제시하고 있나요?"

→ 단순한 "작동 중인가?"가 아니라 "**복리 성장 엔진의 양쪽 바퀴가 같이 돌고 있나?**" 검증 요청.

## 실측 (2026-05-12 기준)

### 자료 측 — revitaWiki는 풍부함
- entities/ : **32 개**
- improvement/ (gotcha) : **21 개**
- ingest 사이클 : #4(5/4) → #5(5/5) → #6(5/7) → #7(5/8) → #8(5/12 진행 중)

### 흡수 측 — myWiki/skills.md에서 revita 키워드 등장 횟수
| 키워드 | 횟수 | 평가 |
|---|:-:|---|
| OOK | 3회 | ✅ AISG 매칭 박제됨 |
| CC1101 | 1회 | ⚠ 한 줄 |
| Modbus | 1회 | ⚠ 한 줄 |
| **Zephyr** | **0회** | ❌ revita 풀스택 RTOS인데 미등재 |
| **libopencm3** | **0회** | ❌ STM32 자산 미등재 |
| **RAK4631** | **0회** | ❌ 보드 단위 자산 미등재 |
| **INA219** | **0회** | ❌ 칩 단위 신규 entity 흡수 안 됨 |

### myWiki에서 revita를 참조하는 페이지는 20개
macro 연결은 OK (skills·strengths·projects·experience·me·goals·ai-direction·index·log + 12 entities). 하지만 **micro 흡수가 빈약**.

## 잘 작동하는 사례 — 어떻게 가능했나

**OOK Replay (revita 기술 발견) → AISG OOK PHY 매칭 (영업 자산)**:

```
revitaWiki/entity-cc1101-remocon: 447 MHz OOK Replay 기술 검증
                ↓ (사용자가 매칭 패턴 인지)
myWiki/thoughts/2026-05-07_OOK-두-응용-영역: 통합 인사이트 박제
                ↓
myWiki/entities/aisg: "위시캣 #155057 AISG 매칭 영업 자산" 명시화
                ↓
[실제 영업 활용]
```

→ **myWiki가 지향하는 복리 성장의 모범 사례**. A(혹) + B(혹) → C(새 가치) → D(행동) 패턴 완성.

→ 그러나 entities 32 개 중 **이런 패턴화는 1~2건뿐**.

## 작동하지 않는 사례 (myWiki에 미흡수)

| revitaWiki 자산 | myWiki 흡수 가능했을 형태 | 현재 상태 |
|---|---|---|
| Zephyr 풀스택 4+스레드 아키텍처 | skills.md "동시성 RTOS 1인 운영" 강점 | ❌ 0회 |
| CC1101 양품/클론 판별법 | 양산 신뢰성 영업 자산 (Stage 0~4 어디든) | ❌ |
| BLE Coded PHY 거리 시험 결과 | "LoRa vs BLE LR 실측 결론" 자산 | ❌ |
| Solar Monitor (INA219 + LoRa SF12 922.1 MHz) | 태양광 모니터링 시장 진입 자료 | ❌ |
| 21개 gotcha (chartjs-cdn, cp2104-collision, rpi-undervoltage, rak4631-swd-dap 등) | gaps.md "1인 1년 작업 함정 패턴" 누적 + 강의 자산 | ❌ |

## 비대칭의 정체 — 사이클 비교

```
revitaWiki ingest 사이클        myWiki re-ingestion 사이클
─────────────────────         ──────────────────────────
✅ 명시적 정책 (자동 감지)    ❌ ad-hoc (사용자 직관)
✅ 정기 트리거 (#4~#8)        ❌ 트리거 없음
✅ 체크리스트 (5단계)         ❌ 체크리스트 없음
✅ 영역별 분류 (3-6 영역)     ❌ 매핑 규칙 없음
✅ 산출물 명시 (entity·gotcha) ❌ "흡수 결과" 정의 없음
```

myWiki의 CLAUDE.md "복리 성장 엔진"은 **수집(Ingest) → 해석(Interpret) → 활용(Use)** 사이클로 정의돼 있는데, **revitaWiki → myWiki 해석(Interpret) 단계가 누락**된 상태.

## 처방 — 옵션 ② (가성비 최고)

**"revitaWiki ingest 사이클 종료 시 myWiki 흡수 체크리스트"** 정식화.

본 thought의 처방으로 myWiki/CLAUDE.md에 새 정책 [[ingest-absorption-policy]] 도입 (2026-05-12).

### 5단계 흡수 체크 (CLAUDE.md에 정식 등재)

1. **신규 entity** → skills.md / strengths.md 새 스킬·강점 검토
2. **신규 gotcha** → gaps.md 패턴 함정 누적
3. **신규 decision** → me.md 의사결정 패턴 검토
4. **매칭 패턴 발견** → thoughts/ 작성 (시너지·교차)
5. **사업 요약 갱신** → entities/revita.md 사업 관점 갱신 필요 검토

소요: 한 사이클당 5~15분.

## 검증 — 본 처방 작동 여부

| 시점 | 검증 항목 |
|---|---|
| **다음 ingest #8 종료 시** | 본 체크리스트가 실제로 5단계 모두 검토됐는가 |
| 1개월 후 (2026-06-12) | myWiki/skills.md에 revita 키워드 등장 빈도 재측정. Zephyr/RAK4631/INA219가 ≥1회로 올라왔는가 |
| 분기 후 | 새 매칭 패턴(OOK→AISG 같은) thought 1건 이상 생산됐는가 |

## 한 줄 요약 (다른 페이지에서 인용 시)

> "이 위키는 한쪽(revitaWiki)만 잘 돌고 다른 쪽(myWiki) 흡수가 빈약했다 — 2026-05-12 처방으로 ingest 종료 시 5단계 흡수 체크 도입."

## 관련 페이지

- [[revita]] — 본 진단의 대상 프로젝트
- [[aisg]] — 잘 작동한 매칭 사례
- [[ai-direction]] — AI 협업으로 위키 운영하는 방식의 메타 회고
- [[2026-05-07_OOK-두-응용-영역]] — 모범 사례 thought
