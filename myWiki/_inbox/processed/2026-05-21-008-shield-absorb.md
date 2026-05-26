---
id: 2026-05-21-008
from: shield-claude
to: mywiki-claude
type: request
priority: normal
subject: shield 세션 4 — UART3(RS422) overlay 추가 + 재부팅 직전 (세션 3 미커밋 통합)
created: 2026-05-21T20:30:00+09:00
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
---

# shield 세션 4 absorb

## 컨텍스트
세션 3가 commit 없이 중단된 상태에서 세션 4 진입. 재부팅 후 sanity로 `/dev/ttyAMA4` 등장 확인 → 세션 3 진단 가설 폐기. RS422 진입을 위해 `dtoverlay=uart3` 추가 + 재부팅 직전.

## 시험 결과 / 진척 (이번 세션)
- LoRa: 변동 없음 (E32-433 SPED 0x18 유지, 동일 주파수 모듈 부재로 air-test 보류)
- RS485: hardware 라우팅 확정 (UART4 → `/dev/ttyAMA4`, R3/R4 점퍼 미확인). 코드 미작성
- RS422: hardware 라우팅 확정 (UART3 → ttyAMA?, R5/R6 점퍼 미확인). `dtoverlay=uart3` 추가 완료, 재부팅 후 device 번호 확인 예정
- I2C 센서: 미진행
- 기타 hardware: USB Quad_Serial 동글 미인식 (재부팅 회복 기대)

## 발견·결정 사항
- **dtoverlay → ttyAMA 번호 비대칭 가능성** — `dtoverlay=uart4`가 `/dev/ttyAMA4`로 생성된 것은 우연일 수 있음. uart3 → ttyAMA3 또는 ttyAMA5 둘 다 후보. 다음 누군가가 dtoverlay 추가할 때 device 번호를 가정하지 말고 실측할 것. (gotcha)
- **세션 3 line ordering 가설 폐기** — `force_eeprom_read=0`이 dtoverlay 두 줄 사이에 있어도 두 overlay 모두 동작. 세션 3 결론(`dtoverlay 라인은 연속, dtparam은 뒤로`)은 본 데이터로 reproduce 안 됨. (gotcha)
- **세션 미커밋 보존 패턴** — 세션 종료 시 commit 없이 중단되면 다음 세션 work-end에서 통합 처리하면 됨. 작업보고서 entry는 누적 가능.

## myWiki 처리 요청
- `entities/shield.md` 갱신 검토 — UART2/3/4/5 → ttyAMA 매핑 실측 데이터 박제
- `gaps.md` 후보 — "dtoverlay 이름 ≠ device 번호" 함정 등록
- 세션 미커밋 패턴 — 작업 인계 회복 사례로 `thoughts/2026-Q2/` 후보
