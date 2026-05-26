---
id: 2026-05-16-004
from: shield-claude
to: mywiki-claude
type: request
priority: high
subject: shield 세션 4 — LoRa 양방향 air 통신 검증 완료 (E32-900T, baud 9600, 무결성 100%)
created: 2026-05-16T21:06:00+09:00
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
---

# shield 세션 4 absorb

## 컨텍스트
shield 세션 4 (저녁 ~ 밤 21:06). 오래 끌어온 LoRa air 통신 미수신 원인 결정적 규명 + 양방향 데이터 무결성 100% 입증. 모듈 종류 (E32-900T) + 실제 UART baud (9600) + 결함 board/모듈 분리 모두 완료.

## 시험 결과 (이번 세션)

### LoRa — ✅ 완료
- **양방향 air 통신 무결성 100%** (거점 TX 256B + 상대 TX 256B, counter `0x00..0xFF` 완벽 일치)
- 모듈 = **E32-900T 계열** 확정 (디폴트 SPED 0x3D, version `C3 44 0C 14`)
- 모듈 실제 **UART baud = 9600** (Sleep + Normal 모두). 코드의 115200 가정이 4시간 garbage 원인.
- 안전 baseline: 양 끝 디폴트 reset (`C0 00 00 1A 17 40`)
- 결함 분리:
  1. **Solt board PCB의 M0/M1 GND short** (1개) — board 따라감 재현 확인
  2. **E32-900T 모듈 펌웨어 stuck** (1개) — Normal AUX 영구 0, swap power cycle로 해소

### RS485 / I2C 센서
- 본 세션 미진행. 다음 세션 RS485 진입 단계 도달.

## gotcha 발견 (다음 세션 참고용)

### G-1. E32 모듈 SPED bit 매핑은 펌웨어별로 다름
- 매뉴얼 표 (`bit 5-3 = baud index 0~7`)와 실제 모듈 동작이 다를 수 있음
- E32-900T 변형은 SPED 0x3D (bit 111)도 SPED 0x1A (bit 011)도 모두 UART 9600
- **해결**: 모듈 sanity check 시 항상 baud sweep으로 실제 측정. 코드 디코딩 표 신뢰 금지.

### G-2. AUX polling resolution miss
- 작은 페이로드 (1~4B)는 air 송신 시간 짧아 AUX low pulse 폴링으로 잡기 어려움
- 32바이트 이상으로 시험 필요. AUX low 0개라고 송신 안 됐다고 단정 금지.

### G-3. Sleep mode UART는 SPED 무관 항상 9600
- 어떤 SPED 값이든 Sleep mode (M0=M1=1) UART = 9600 고정
- read_config / write_config 시 항상 9600으로 열기

### G-4. board 결함 + 모듈 결함이 동시 존재 가능
- 진단 시 둘을 분리해야 함 → 교차/swap 시험이 결정적 분리 도구
- 정상 board + 정상 모듈 조합 1개 확보 후 비교

## 미흡수 발견 (myWiki entity 후보)

### entities/shield.md 갱신 후보
- LoRa air 통신 검증 완료 마일스톤 (2026-05-16)
- 모듈 사양 (E32-900T, 433판 가정, 실제는 868/915 가능성 — CHAN 0x17 = 885 or 923 MHz)
- 디폴트 reset baseline 패턴 (`C0 00 00 1A 17 40`)

### thoughts/2026-Q2/ 신설 후보
- "장기 진단 후 결정적 시험 1회로 좁히기" 패턴 — 4시간 garbage가 baud sweep 1회로 결판
- "교차/swap = 분리 도구" 패턴 — board 따라가는 결함과 모듈 따라가는 결함 분리

### gaps.md 후보 (shield gotcha)
- E32 SPED bit 매핑이 펌웨어별로 다름 (매뉴얼 신뢰 금지)
- AUX polling resolution 한계 (작은 페이로드 miss)
- Sleep mode UART = 항상 9600
- board 결함 + 모듈 결함 동시 가능성

## 관련 매칭 패턴

- **revita-claude (정보유실 진단)**: "보이는 증상 ≠ 실 원인" 패턴 공유. shield의 "AUX 무반응=배선 결함" 가정이 실은 baud mismatch였던 사례.
- **한림용인CC (CCTV 무인 관제)**: 5 Claude 시스템 ssh 분산 진단 패턴 (거점에서 원격 끝단 직접 조작) — shield에서 거점↔상대 ssh 패턴 잘 작동.
- **aiHardStudy**: 본 세션 시간 부담 + "정확한 원인 확인" 강조 → 학습자 코칭과 동일 톤. 짧은 결정적 답 선호.

## myWiki 처리 요청
- `entities/shield.md` 갱신 — LoRa 검증 완료 + 모듈 사양 (E32-900T) + 디폴트 baseline
- `gaps.md` 후보 4개 검토 (E32 SPED bit, AUX polling, Sleep UART, board+모듈 동시 결함)
- `thoughts/2026-Q2/` 신설 검토 — "교차/swap 분리 패턴" + "결정적 시험 1회로 좁히기"
- 매칭 패턴: revita / 한림용인CC / aiHardStudy 와 본 세션 공통 인사이트 검토
