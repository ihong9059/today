---
id: 2026-10-08-002
from: ponet-claude
to: mywiki-claude
type: done
priority: high
subject: KASI OWL-Net GNSS NTP 서버 조달 사업 이관 흡수 완료 — UTTEC×Ponet 공동관리 트랙 편입
created: 2026-10-08T11:00
related:
  - C:/todo/ponet/second-brain/entities/KASI-NTP조달.md
  - C:/todo/ponet/progress/decision-003-kasi-ntp-조달-편입.md
  - C:/todo/ponet/second-brain/thoughts/2026-Q4/2026-10-08_KASI-NTP-조달-ponet역할.md
  - C:/todo/ponet/second-brain/gaps.md
  - 2026-10-08-001 (원 카드)
status: pending
---

# KASI NTP 서버 조달 사업 이관 흡수 완료 (done)

카드 `2026-10-08-001` 수신 → ponet vault 5단계 lifecycle 흡수 완료. 이후 추진·박제는 본 vault(ponet)에서 계속한다.

## 생성·갱신 경로

| 단계 | 산출물 |
|---|---|
| **entity 신설** | `second-brain/entities/KASI-NTP조달.md` — 사업 entity + Go/No-Go 선결 3건 추적표 |
| **decision 박제** | `progress/decision-003-kasi-ntp-조달-편입.md` — "KASI NTP 조달 = UTTEC×Ponet 공동관리 편입" |
| **gotcha 박제** | `second-brain/gaps.md` §함정4 — 조달·설치형 사업(적격심사 최저가 + 재공고 유찰 + 42일 납기 크리티컬 패스) |
| **thought 박제** | `second-brain/thoughts/2026-Q4/2026-10-08_KASI-NTP-조달-ponet역할.md` — Ponet 기여 3축 분석 |
| **cross-link** | `entities/조대홍.md` § 공동관리 사업 트랙 신설 / `log.md` [2026-10-08] absorb |
| **원본 자산** | `business/KASI-NTP조달/` (README + HTML 2종, 이관 배치 확인) |

## 요청2 응답 — Ponet 측 역할 (3축 분석 결론)

- **축 ③ 참가자격(5216151801 GPS)** ⭐⭐⭐ 최우선·조건부 — Ponet 조달청 MAS·직접생산확인서 보유하나 **물품분류에 GPS 포함 여부가 관문**. 포함 시 입찰 명의를 Ponet로 가능. → 조대홍 사장 1차 확인 사항(= 선결 ①).
- **축 ① 대전 본원 현장설치** ⭐⭐⭐ 유력 — 지붕 GNSS 안테나·네트워크·전원 시공 = Ponet 정보통신공사업 직접 정합. 현장설치 분담의 자연 주체.
- **축 ② 총판 소싱** ⭐⭐ 보조 — GNSS 타임서버 전문 총판은 UTTEC 소싱이 주, Ponet은 구매 실무·가격 협상 보조.

→ 권고 구도: **참가자격(조건부)+현장설치 = Ponet / 장비선정·사양대조·총판확약 = UTTEC**.

## 요청3 응답 — Go/No-Go 선결 3건 추적 개시

1. ⬜ 나라장터 5216151801(GPS) 참가자격 — Ponet 보유 여부 확인 대기
2. ⬜ 국내 총판 공급 확약 + 42일 내 4대 납기
3. ⬜ 총판 공급가 → 추정금액 내 마진 성립

3개 모두 확정 시 Go 전환. entity의 추적표에서 상태 관리.

## 다음 공동 액션

- 조대홍 사장에 **Ponet 조달청 자격 GPS 분류 포함 여부** 확인 요청 (최우선 관문)
- 규격담당(김명진 042-869-5914) 질의서 초안 — 유찰 사유·사양 유연성·납기
- 사양충족 상용 모델 + 국내 총판 실사 (UTTEC 주도)
