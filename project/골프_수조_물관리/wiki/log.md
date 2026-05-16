---
title: 한림용인CC 시공 진행 로그
type: log
created: 2026-05-17
updated: 2026-05-17
---

# 한림용인CC 고가수조 자동급수 무선제어 — 진행 로그

> Tier 2 sub-vault. 시공·진행·결정 단계별 박제.
>
> action: start / decision / purchase / site / firmware / revenue / milestone / complete / absorb

## [2026-05-17] start | Tier 2 sub-vault 신설 — 한림용인CC 시공 진행 격리 공간

- 프로젝트 개요: 한림용인CC 고가수조 자동급수 무선제어 (1,000만/VAT 포함 11,022,108원)
- 발주자: 한림용인CC (골프존카운티 한림용인, 경기도 용인 처인구 남사면)
- 단계: ★ 시공 직전 (D-3, 5/20 D-day)
- sub-vault 신설 배경:
  - 사용자 요청 — Tier 2 sub-vault 패턴 실험 사례 1번째 (2026-05-17)
  - 목적: ① 진행 관리 격리 ② myWiki wiki화 과정 측정 ③ 완료 후 라이프사이클 평가
  - 결정: today 직접 박제(추적 불명확) vs 별도 repo(과잉) 사이 중간 — sub-vault 채택
- 1차 기획 참조: `../README.md` (10KB, 2026-05-10 작성)
- myWiki entity: `today/myWiki/second-brain/entities/한림용인cc-고가수조.md` (2026-05-12 신설)

## [2026-05-17] decision | sub-vault 라이프사이클 측정 대상 정의

본 sub-vault의 실험 목적 (Tier 2 패턴 검증):

| 단계 | 측정 항목 |
|---|---|
| 1. 셋업 | 셋업 코스트 (실측: ~20분) |
| 2. 시공 진행 박제 (5/17~5/20) | 카드 발송 vs 직접 박제 효율 |
| 3. 시공 완료 (5/20 이후) | sub-vault 산출물 양·질 |
| 4. myWiki 흡수 (5/21~) | 흡수 비용 + 정보 손실률 |
| 5. archive 결정 (1~2주 후) | "분리할 가치 있었나" 평가 |

→ 평가 결과는 `obsidian/myWikiSetup/EXAMPLES_tier2_subvault.md`에 자산화 예정 (myWikiSetup 5번째 사례, Tier 2 1번째 사례).

## 다음 박제 예정 (할 일 큐)

- `## [날짜] purchase | 920MHz E22 변종 5~7개 발주` (D-3)
- `## [날짜] site | 한림용인CC 현장 답사 결과` (D-7, 8노드 GPS·LoS)
- `## [날짜] firmware | nRF52832 → 920MHz 포팅 검증` (D-10)
- `## [날짜] purchase | QDY30A-B 수위 센서 5+5개 발주` (D-7)
- `## [날짜] milestone | 시공 시작` (D-day)
- `## [날짜] complete | 시공 완료 + 운영 안정성 첫 데이터` (D-day +30일)
- `## [날짜] absorb | myWiki 흡수 — 한림그룹 재거래 패턴 + Stage 3 실증` (시공 완료 후)
