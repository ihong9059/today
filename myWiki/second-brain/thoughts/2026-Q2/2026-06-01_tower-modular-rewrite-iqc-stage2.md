---
title: revita ingest #13-A Tower 모듈러 재작성 풀세트 → 양면 IQC (Link + Tower) 진입
type: thought
created: 2026-06-01
updated: 2026-06-01
tags: [thought, revita, ingest13A, Tower, 모듈러재작성, 양면IQC, strengths10, RS485, Modbus, MQTT, LTE, RM76, 정본md, 양산onboard, 5채널영업, 통합비용명확화]
links: [revita, strengths, gaps, ai-direction, skills]
---

# revita ingest #13-A — Tower 펌웨어 모듈러 재작성 풀세트 → 양면 IQC (Link + Tower) 진입

## 사실 A — 5/29 ingest #12 = Link 단면 IQC 정착 (strengths §9)

5/27 "정착 직전" → 5/29 "정착 완료": kc_cert_link_v2/scenarios/ Python 자동화 4 모듈 + 17 PASS + EVT 1.75초 + 수신율 99.1% + 디버그 사이클 3분 → **월 7,200대 (모드 A)** 양산 캐파 실측.

## 사실 B — 6/1 ingest #13-A = Tower 풀세트 정착

- BASE `05f36b56` → HEAD `8e6682a5`, 7 commits / +18,468 / -3,282 / 106 파일 중 ~14K LOC tower 분할
- 11 모듈 .c **약 8,900 LOC**
- 정본 .md **18건 1,950줄** (AT 명령 정본 포함)
- 자체 시험 7건 1,031줄 + Static Review (sbc 11 / security 12 / lux 8 PASS)
- LTE stub → 실구현 2,307줄 (RM76 AT 5 STEP + URC + CME + FSM 7 + TX ring 256 DROP_OLDEST + BATCH 10분)

## 사실 C — 신규 entity 4건 (revita 측 → myWiki 흡수)

| revita entity | myWiki 흡수 |
|---|---|
| `entity-lux-module` | skills.md § RS485/Modbus 마스터 / § MUX mutex 공유 |
| `entity-mqtt-protocol` | skills.md § MQTT 와이어 프로토콜 설계 / § 토픽 계층 / § LWT |
| `entity-tower-test` | strengths.md §10 양면 IQC |
| `entity-lte-module` (갱신) | skills.md § LTE AT 풀스택 / § MQTT 클라이언트 임베디드 |

## 새로운 판단 D — 양면 IQC = 풀스택 모듈러 패턴 + 자체 시험 + 정본 인증 자산

A + B + C 종합:
- **Link 측** 자동화 4 모듈 (proto + tc_kc_01 + tc_kc_l2 + tc_kc_20) → 양산 캐파 7,200대 실측
- **Tower 측** 자체 시험 7건 + west build PASS + Static Review 3 도메인 PASS → 정본 .md 18건 인증 자료
- **양면 합쳐 = 풀스택 IQC** — Link 단면 시점 (1 vault 1 영역)에서 Tower 합류로 2 vault 2 영역 양면화

→ **결정 25 (ai-direction.md) 박제**: revita 양면 IQC 진입.

## 사실 E — 신규 모듈 4 함수 표준화

`_init / _activate / _handle_cmd / _force_session_off` + NVS 표 1줄 + module_type_code 1행 → 통합 비용 명확화.

→ **신규 합류 인원 onboard 자산** — 정본 .md 18건 + 4 함수 표준화로 신규 임베디드 엔지니어 onboard 시간 단축 정량화 가능.

## 행동 변화 F

1. **strengths.md §10 양면 IQC 풀스택 운영 능력 신설** (Link + Tower 양면)
2. **gaps.md § 양산 출하 전 RA 6 항목 신설** (LTE 4 TODO + ADC stub + USB RX + Button LONG + BLE stub + `TOWER_DM_BOOT_TEST` 양산 빌드 정책)
3. **5채널 영업 양면 카피 격상**:
   - uttechome: "Link 양산 정착 + Tower 양산 정착" 양면 영업 메시지
   - 위시캣 사례연구: Link 17 PASS + Tower 7건 + 정본 .md 18건 → 양산 onboard 시간 단축 결정타
   - 한림용인CC: bridge_cli + Web UI 풀스택 + Tower 모듈러 carry 가능
   - shield-claude RPi: `scenarios/` Python 러너 패턴 carry
   - n8n-claude: KC2 wire + bridge_app UART 표준화 + Tower 모듈 4 함수 통합 패턴

## 의미

본 ingest는 **revita = single product** → **revita = Link + Tower 양산 production line** 변곡점. 5/29 단면 IQC → 6/1 양면 IQC = 사업 페이즈 명시 (Link 단면 → Link+Tower 양면). 양면 캐파 산정은 Tower RM76 sourcing + ADC 실측 + USB CDC RX 등 5 BLOCKED 해소 후 (gaps RA 6 항목).

## carry-over

- **6 양산 RA 해소 시점** = revita 양면 캐파 산정 가능 단계
- **uttechome 제품 라인업** = Link N + Tower 1 → 양산 onboard 시간 단축 근거 박제 carry
- **본인 영업 자산** = 8 LOC + 18건 정본 .md + 7건 자체 시험 → 위시캣 영업 시 "양면 IQC 풀스택 운영" 메시지 사용

## 관련

- [[revita]] § 6/1 ingest #13-A
- [[strengths]] §10 양면 IQC
- [[gaps]] § 양산 출하 전 RA 6 항목
- [[ai-direction]] § 결정 25
- [[skills]] § RS485/Modbus + MQTT + LTE
