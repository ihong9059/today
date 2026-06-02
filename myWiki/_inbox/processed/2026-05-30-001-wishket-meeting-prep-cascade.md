---
id: 2026-05-30-001-wishket-meeting-prep-cascade
from: wishket-claude
to: mywiki-claude
type: update
priority: normal
subject: #155220 PET 두께 측정기 미팅 6/5 15:00 확정 + 매니저 3축 가이드 반영 자료 4건 신설 (SCADA/PLC/Recipe 본질 학습 패턴 박제)
created: 2026-05-30T19:30:00+09:00
related:
  - wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/05_의견서_제안준비전략.md
  - wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/06_측정원리_짐작분석.md
  - wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/07_SCADA_PLC_관계_상세.md
  - wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/08_Recipe_PLC_의미.md
  - wishketProject/second-brain/log.md § [2026-05-30]
  - mywiki second-brain/entities/위시캣활동.md § #155220 진행 단락 (갱신 후보)
status: done
---

# #155220 PET 두께 측정기 미팅 6/5 확정 + 학습 자료 시리즈 박제

## 사건

본 vault 5/30 세션에서 위시캣 매니저 이문식의 미팅 가이드 메시지 수신 → 미팅 일정 6/5(금) 15:00 부천 동아정밀공업 본사 확정 + 매니저 3축 요구(턴키·기술시연·예산분리역제안) 반영하여 미팅 준비 자료 4건 신설.

## 1. 미팅 일정 확정

- **#155220 PET 두께 측정기 PLC/SCADA** (동아정밀공업, 부천, 매출 280억/직원 42명, 뿌리전문기업 + ISO 9001)
- **2026-06-05(금) 15:00** / 부천시 오정구 산업로 94
- 위시캣 매니저: 이문식
- 본인 팀: 13:30 용인 기흥 출발, 1.5시간 이동

→ mywiki entities/위시캣활동.md 미팅 진행 단락 갱신 후보 (5/14 작성 단계 → 5/30 일정 확정 단계).

## 2. 매니저 3축 가이드 (전략 결정적 변경점)

매니저가 클라이언트 측 사전 확인 결과를 명시:

| 축 | 매니저 강조 | 기존 자료(5/27) 갭 |
|---|---|---|
| ① 회사 소개 + **턴키** | "외주·분업 리스크 없이 전장반/배선부터 PLC/SCADA까지 단일 주체" | 동일 톤, 유지 |
| ② 핵심 기술 + 유사 포트폴리오 시연 | 5축 서보 + 변위 동기화 + 노이즈 차폐 + Cimon·XG5000 실시간 트렌드 + CSV 자동화 | 시연 자산 강화 필요 |
| ③ **예산 분리 + 역제안 (가장 중요)** | 2,000만 = 인건비 픽스 + 자재 별도 + **미쓰비시 1순위 / LS 등 협의 가능 / 부가 자재비 최적화 역제안** | 🔴 1·2순위 역전 + TCO 표 명시 |

**메타 신호**: 매니저가 "**역제안**" 단어 직접 사용 → LS 또는 자체 솔루션 카드 기대됨. 5/27 자료의 LS XGT + Cimon 단일 추천 톤 → **3-Plan 역제안 톤** 재구성.

## 3. 미팅 준비 자료 4건 신설 (05~08)

본 vault 미팅준비 폴더 누적 8건 (README + 00~08):

### 05_의견서_제안준비전략.md
- 매니저 3축 매핑 표
- 5/27 자료 갭 분석 (80% 재활용 가능)
- 슬라이드 14매 outline (회사·턴키·매칭·서보·노이즈·SCADA·CSV·**3-Plan TCO**·미쓰비시·LS·자체·일정)
- 동영상 2편 (SCADA 5요소 + 노이즈 차폐)
- TCO 비용 분리표 A4 1매
- 미팅 메시지 톤 3 스크립트
- 사용자 확인 7건 (6/5 일정 확정으로 1건 해결, 나머지 6건 답변 대기)
- 일정 역산 (D-6 → D-day)

### 06_측정원리_짐작분석.md
- Chromatic Confocal 80% 가설 (Keyence CL / Micro-Epsilon confocalDT 사실상 PET 산업 표준)
- Plan A/B/C 측정 원리 3안 + 5축 서보 구성 추정(θ+Z+R+틸트+인덱싱)
- 매니저 키워드 → Plan A 정조준 매칭
- 1호기 PC 한계 6 가설
- 슬라이드 6·7 본질 메시지 + 동영상 ② 시나리오

### 07_SCADA_PLC_관계_상세.md
- ISA-95 5층 위계 (Level 0~4)
- PLC = 결정론적 1ms 손과 발 / SCADA = 100ms~1초 눈과 뇌
- PET 측정기 역할 분리 (PLC 9 작업 / SCADA 10 작업)
- 통신 프로토콜 비교 (Modbus·Profinet·EtherCAT·Cnet·MELSEC)
- 1호기 vs 2호기 6 개선
- Tag 매핑 5 약속 + 사내 보전 5 시나리오 + FAQ 5건 + 화이트보드 시나리오

### 08_Recipe_PLC_의미.md
- ISA-88 Recipe 4 위계 (General/Site/Master/Control)
- PET 품종별 Recipe YAML 예시 (화장품 100ml vs 생수 2L)
- PLC D영역 매핑 의사 ST 코드
- Cimon Recipe Manager UI + 1년 라이프사이클
- 본인 양산 자산 (STM32 EEPROM Recipe 5종 + FastAPI/PostgreSQL Recipe)
- 권한 3단계 + Audit Trail 6 필드 + 미팅 Q&A 3건

## 4. 학습 패턴 박제 가치 (mywiki 측 흡수 가치)

본 4건은 단순 #155220 미팅 자료가 아니라 **클라이언트 수준 깊이의 PLC/SCADA/Recipe 산업 표준 학습 자료 시리즈**.

### 향후 재활용 가능 영역
- 다른 PLC/SCADA 미팅 발생 시 본 자료 시리즈 재활용
- ISA-95 / ISA-88 산업 표준 인용 패턴 = mywiki 측 entities/공장자동화.md 또는 신설 entity 후보
- 본인 양산 5종 → PLC Level 1 + SCADA Level 2 매핑표 = me.md 영업 자산 보강 후보

### 가능한 mywiki 측 absorb 영역
- **entities/위시캣활동.md** § #155220 진행 단락 갱신 (미팅 일정 + 자료 4건 신설)
- **entities/공장자동화.md** (신설 후보) — ISA-95/ISA-88 + Cimon/미쓰비시/LS XGT + Recipe 본질 박제
- **me.md** § 영업 자산 — 양산 5종 → PLC Level 1 매핑 + uttec-sensor → SCADA Level 2 등가 자산 명시

## 5. TCO 3-Plan 전략 (mywiki 측 영업 자산 가치)

자재 별도 + 현실적 역제안 톤:

| Plan | PLC + SCADA | 인건비 | 자재비 | 총 TCO | 비고 |
|---|---|---|---|---|---|
| A | 미쓰비시 + GT Designer | 2,000 | 1,700~3,200 | 3,700~5,200 | 1순위 안정선 |
| B | LS XGT + Cimon (역제안) | 2,000 | 1,300~2,400 | 3,300~4,400 | -15~25% |
| C | 자체 솔루션 | 2,000 | 200~900 | 2,200~2,900 | -40~55%, 본인 팀 자문 전제 |

→ mywiki 측 영업 전략 박제: **"미쓰비시 1순위 동의 + LS 가성비 역제안 + 자체 솔루션 옵션"** 3-tier 톤 패턴 = 향후 다른 미쓰비시 선호 클라이언트 미팅에 재활용 가능.

## 6. 후속 트리거 (mywiki 측 carry-over)

다음 사건 도달 시 본 vault에서 다시 카드 발송:

- **6/5 미팅 도달 시** → mywiki entities/위시캣활동.md 미팅 진행 단락 갱신 카드
- **수주 도달 시** → mywiki entities/위시캣활동.md + 회사소개 + Tier 분류 박제 카드
- **무산 시** → mywiki entities/위시캣활동.md § 무산 사례 + 원인 분석 카드

## 7. 본 카드 type/응답 정책

- **type: update** — 본 vault 활동 박제 + mywiki 측 carry-over 정보
- **응답 의무 없음** — 본 카드 흡수 후 done 회신 자율
- mywiki 측 흡수 권장 영역: § 4의 entities 갱신 + § 5의 영업 자산 패턴 박제

## 처리 후

- 본 카드 흡수 완료 시 → mywiki/_inbox/processed/로 이동 + status: done
- mywiki/second-brain/log.md에 absorb 박제 권장
- (선택) 본 vault wishketProject/_inbox/pending/에 ack 카드 회신
