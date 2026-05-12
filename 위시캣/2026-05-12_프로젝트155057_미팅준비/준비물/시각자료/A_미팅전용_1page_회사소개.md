---
title: AISG 3.0 포팅 미팅 — UTTEC 회사 소개 (1-page)
date: 2026-05-12
for: 위시캣 #155057 클라이언트 미팅
---

# ㈜유티텍 (UTTEC)
### Network Solution · 임베디드 통신 양산 38년

---

## 회사 정체성

| | |
|---|---|
| 설립 | 2016년 6월 (1995년 활동 시작) |
| 위치 | 경기도 용인시 기흥구 흥덕유타워 2404호 |
| 대표 | 홍광선 (펌웨어 38년, 삼성·파나소닉 양산 출신) |
| 협업 | 임호균 (회로설계 25년, ARM CPU 설계, CAN/RS-485) |
| 슬로건 | Network Solution |

**★ 사무실이 AISG 현장과 동일 지역 (용인 기흥구) — 출장비 0, 디버깅 사이클 당일**

---

## 핵심 실적 3가지

| # | 실적 | 의미 |
|:-:|---|---|
| 1 | **일본 자전거주차장 BLE Mesh 양산 3,800대 수출** (2022~2023) | Device Discovery·Multi-Primary 대규모 검증 |
| 2 | **국내 최초 LoRa + 클라우드 상용화** (2018) | 벤처기업 인증 |
| 3 | **양산 중인 통신 제품 5종** | Modbus RTU·EtherCAT·BLE·LoRa·CAN |

---

## 통신 프로토콜 7종 (★ AISG 매칭)

| # | 프로토콜 | 위치 | AISG 매칭 |
|:-:|---|---|---|
| 1 | RS-485 Modbus RTU | 양산 + KC 인증 | **AISG RS-485 PHY** |
| 2 | BLE Mesh | 일본 양산 3,800대 | **Device Discovery·Multi-Primary** |
| 3 | LoRa | 국내 최초 상용화 | 장거리 + 클라우드 |
| 4 | EtherCAT | 양산 (산업용 MFC) | 실시간 통신 |
| 5 | CAN | 임호균 주도 | 차량/산업 |
| 6 | **OOK Sub-GHz (CC1101)** | **직접 구현 (2026-05)** | **★ AISG OOK PHY와 동일 변조** |
| 7 | AISG 3.0 (분석 완료) | 위시캣 #155057 사전 학습 | — |

---

## 인증 / 특허

- 한국 특허 #10-1623345 (복합센서 디밍제어, 2016)
- 일본 특허 #5982528 (LED駆動制御システム, 2016)
- AI FanStick 특허 출원 중 (음성 + AI + BLE)
- **KC / TELEC / CE 3개국 인증** 보유 + 벤처기업 인증 (2018)

---

## 본 프로젝트 매칭률 13/13 (요약)

```
임베디드 38년 | MCU 펌웨어 | RS-485 PHY 양산
OOK PHY 직접 구현 ★ | HDLC + CRC-CCITT 16
Device Discovery (Mesh 3,800대) | Multi-Primary
Connection Mapping | Ping Packet
현장 동일 지역 | KC/TELEC/CE 인증
C++ 레거시 분석 (삼성·파나소닉) | HW+SW 2인 팀
```

→ **AISG 3.0 신규 변경점만 학습 필요. 학습 비용 거의 0.**

---

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 변환 권장 | Markdown → Pandoc/PowerPoint → PDF 1장 |
