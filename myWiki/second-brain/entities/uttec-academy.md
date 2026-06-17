---
title: uttec-academy vault — UTTEC 교육 운영·발전 hub
type: entity
created: 2026-06-17
updated: 2026-06-17
tags: [vault, 교육, 교육사업, 스마트팩토리실습, 미래창의아카데미, 자체kit, multi-agent, uttec-academy-claude, Tier3, 교육전문성, 사업방향]
links: [vault-registry, uttec-factory, lora, onDevice-ai, uttec-edu, 강사양성_파일럿, 영업전략, ai-direction]
---

# uttec-academy vault — UTTEC 교육 운영·발전 hub

## 한 줄 정의

UTTEC가 **자체 제작 kit 기반 오프라인 실습 교육사업**의 운영(delivery)·행정·강사·차수 개선을 단일 출처로 관리하고, 성과·개선을 myWiki로 cascade하여 **UTTEC 사업방향에 교육 분야 전문성**을 축적하는 vault. (20th multi-agent, 2026-06-17 신설)

## ⭐ 사업 목적 (핵심 2축)

1. **UTTEC 사업방향 = 교육 분야 전문성 추구** — 임베디드·IoT·AI 양산 역량을 교육 콘텐츠·커리큘럼·강사 역량으로 자산화하여 교육을 **정식 사업 라인**으로 육성 (단발 강의 수행 ≠ 목적, 반복·개선되는 교육 전문 기업 포지셔닝).
2. **자체 제작 kit 기반 교육사업** — UTTEC가 직접 설계·제조한 실습 kit로 교육 진행. kit = UTTEC 제품(수익원 + 차별화). 교육 후 kit는 자산으로 남아 재구매·확산·후속 교육 연결. **"교재 + kit + 강사" 일괄 공급** 통합 교육사업.

## 신설 동기

미래창의 아카데미 'AI·IoT 스마트팩토리 실습' 3차(2026-07-15 개강)를 계기로, 교육 운영 자료가 `aiHardStudy/`·uttec-factory·강사양성 등에 분산되어 **반복 교육의 운영·개선 단일 출처가 없었다**. 사용자 결단(A안 = 교육 전반 hub): 프로그램마다 vault를 쪼개지 않고 **단일 교육 운영 hub**에 프로그램·차수 폴더로 누적 (lora hub 패턴과 동형 — 응용이 아닌 도메인 기준 집약).

## 메타

| 항목 | 값 |
|---|---|
| 위치 | `C:\todo\uttec-academy\` (Windows 본 PC) |
| Claude 식별자 | `uttec-academy-claude` |
| 합류 | 2026-06-17 (20th) |
| repo | private (git init 완료, origin 없음) |
| broker | 양방향✅ (`_inbox/outbox-staging/`→`sent-archived/`) |
| Obsidian | A군 (사람-사유) |
| Tier | Tier 3 (교육 운영·발전 hub) |

## scope

- ✅ **책임**: 교육 운영·delivery·행정·강사 운영·kit 운영(수량/배포)·교재 버전·차수 개선·재수주
- ❌ **비책임 (참조만)**: kit hardware 검증·핀맵 = [[uttec-factory]] / 무선 기술 = [[lora]] / AI 모델 = [[onDevice-ai]] / 온라인 교육 플랫폼 = [[uttec-edu]] (별개)

## 구조

| 경로 | 내용 |
|---|---|
| `_공통/` | 재사용 자산 (커리큘럼 모듈·kit BOM/SOP·강사풀·행정양식) |
| `프로그램/{프로그램}/{N차}/` | 차수별 운영계획·5회 강의안·행정·retro |
| `개선로그.md` | ⭐ 차수 횡단 발전 엔진 |
| `영업_재수주.md` | 차기·신규 수주 |

## 진행 중 — 미래창의 아카데미 3차

- AI·IoT 기반 스마트팩토리 실습, 용인시 기업 임직원·예비창업자, 초급
- 2026-07-15 ~ 08-12 매주 수 13:00~17:00, 5회 20h, 소공인스타트업 허브 2층
- 강사 홍광선·홍광삼 / kit = Pi 4B + UTTEC Shield
- 5회: 라파 친해지기 → 센서+OLED+LED → 기준값 경보 → 웹/무선(LoRa) → AI 손글씨+미니 스마트팩토리

## 관련 vault·엔티티 구분

| | 정체 |
|---|---|
| [[uttec-academy]] (본 entity) | 오프라인 실습·**자체 kit 교육사업 운영** hub (신규) |
| [[uttec-edu]] | 온라인 교육 플랫폼 (Next.js 웹, 37코스) — 별개 |
| [[uttec-factory]] | kit hardware 검증·핀맵 (factory-rpi4) — 기술 진실 |
| [[강사양성_파일럿]] | 강사양성 트랙 — 본 hub의 한 프로그램으로 흡수 가능 |

## 사업 함의 (ai-direction 참고)

교육을 UTTEC 정식 사업 라인으로 — 양산·인증·38년 임베디드 신뢰성 + 검증 자산(LoRa·AI 이상탐지 F1 0.995·공장자동화 kit)을 교육 콘텐츠로 전환. kit 통합 공급으로 1회성 강의를 넘어 반복 수익(kit 재구매·후속 교육)·기관 재수주 구조.

## 관련 페이지

- [[vault-registry]] — 20번째 행
- [[uttec-factory]] · [[lora]] · [[onDevice-ai]] — 기술 진실 참조
- [[uttec-edu]] — 온라인 플랫폼 (구분)
- [[강사양성_파일럿]] · [[영업전략]] — 교육 사업 cascade
