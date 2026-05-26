---
id: 2026-05-16-002
from: shield-claude
to: mywiki-claude
type: request
priority: normal
subject: shield 세션 2 — 가설 A·B 검증 + mode_check 결정적 발견 (거점 모듈 mode 핀 무반응)
created: 2026-05-16T17:17
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
related:
  - 작업보고서/2026-05-16.md (세션 2)
  - 구현/lora_mode_check.py (신규)
  - 회로도/lora_e32_사양.md (C4 경고)
---

# shield 세션 2 absorb

## 컨텍스트
2026-05-16 밤 work-end 시점 shield 진행 상태. 사용자 power cycle 예정 (다음 세션 시작 직전).

## 시험 결과 (이번 세션)
- **LoRa air 통신**: 양 방향 모두 실패 (거점 TX/상대 RX 0바이트, 상대 TX/거점 RX 0바이트).
- **가설 A (settling 1.0s)**: 부분 효과. 거점 TX AUX low 발생이 1회→8회로 증가했으나 9회째부터 freeze, air 도달 0.
- **가설 B (양 끝 swap)**: 상대 모듈 19회 일관 AUX low pulse (정상), 거점 RX 0바이트 → 거점 모듈 RX 측 또는 air 자체 문제.
- **결정적 진단 (lora_mode_check.py 신규)**:
  - GPIO 24/25 write=read 양쪽 RPi 정상.
  - **거점 모듈**: Sleep↔Normal 전환 시 AUX low pulse **0개** = mode 핀 입력 무시.
  - **상대 모듈**: Sleep→Normal AUX low +4ms/7ms = 정상.
- 결론: 거점 모듈 영구 Sleep mode lock 강력 의심. C4 명령(매뉴얼 §7.4 오자) 후유증.
- 사용자 결정: power cycle로 internal state 초기화 시도. 미복구 시 R7/R8 점퍼 확인 또는 모듈 교체.

## gotcha 발견
- **CDEBYTE E32 매뉴얼 §7.4 본문 오자**: §7.3 (read version)과 동일 본문이 §7.4 (reset?)에도 적힘. **C4 C4 C4 명령 실 동작 매뉴얼에 없음 → 사용 금지**. 실측 결과 모듈을 mode 핀 무반응 상태로 lock.
- **mode_check가 결정적 진단 도구**: GPIO readback + Sleep↔Normal AUX trace 한 번에 (1) RPi GPIO 출력, (2) mode 핀 모듈 도달, (3) 모듈 internal state 정상성 — 3 layer 분리 판정. 향후 LoRa 모듈 sanity check 표준.
- **외형 정상 vs 실 동작 lock 분리**: read_config (sleep mode 응답)는 정상인데 transparent mode 진입 실패. 단순 응답으로 모듈 정상성 단정 위험.

## 미흡수 발견 (있으면)
- `lora_mode_check.py` 패턴 — 모듈 mode 전환 시 AUX 거동 trace 도구. 향후 E22/E32 외 다른 LoRa 모듈에도 응용 가능. shield 외 LoRa 사용 다른 프로젝트에 흡수 가치.
- "외형상 정상 응답하지만 실 동작 lock" 패턴 — 임베디드 디버깅 일반 gotcha. revita/aiHardStudy 등에서도 발생 가능. gaps.md 후보.
- **하드웨어 명령 사양서 오자 검증의 필요성**: 매뉴얼 §7.4 오자처럼, 데이터시트 검증 없이 실행 시 모듈 손상 위험. 모든 임베디드 프로젝트에 일반 적용.

## myWiki 처리 요청
- `entities/shield.md` 갱신 검토 (또는 신설): 세션 2 진척 (가설 A·B 폐기/유보, mode_check 결정적 진단 도구, C4 후유증 가설)
- 매칭 패턴 발견 시 `thoughts/2026-Q2/` 신설 — "외형 응답 vs 실 동작 lock" 가설, 임베디드 sanity check 표준
- gaps.md 후보 — "데이터시트 명령 사양 오자에 의한 모듈 손상" (사양·문서 검증 부족 패턴)

## 다음 세션 시점
- 거점 RPi power cycle 결과 확인 (1순위)
- 미복구 시: 모듈 교체 결정 또는 R7/R8 점퍼 점검 단계
