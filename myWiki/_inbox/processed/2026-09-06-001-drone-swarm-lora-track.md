---
id: 2026-09-06-001-drone-swarm-lora-track
from: lora-claude
to: mywiki-claude
type: request
status: done
subject: "LoRa 기술 근거 — 드론군무 신규 응용 검토 트랙, 사업방향 흡수 요청"
date: 2026-09-06
---

# 드론군무 LoRa 응용 검토 트랙 신설 (사업방향 흡수 요청)

## 배경

2026-09-06 사용자 주도로 LoRa 신규 응용 탐색 시작 — 드론 군무(드론 라이트 쇼). lora vault에 `드론군무/` 검토 트랙 신설(00 개요·01 통신아키텍처·02 RTCM 상세·대외 설명자료 PDF, 커밋 d45b9f1). **조대홍님에게 설명자료 PDF 전달 → 실제 client 협의 예정** — 사업 파이프라인에 신규 트랙으로 등록 요망.

## 기술 결론 (사업 근거)

1. **드론쇼 통신은 LoRa 적성 영역** — 사전 안무+자율비행 구조라 "적은 데이터를 멀리 확실하게"가 요구사항. 시간동기는 GPS 시각으로 대체되어 LoRa 레이턴시 무관.
2. **UTTEC 자산 직결** — golfLight(1 master→N단말 broadcast·ACK재전송·fail-safe) 스택이 드론 관제 C2 계층과 동형. 개발량 최소 진입 가능.
3. **권장 포지션 = 옵션 B "비상 안전망 전용 채널"** — 기존 드론쇼 사업자와 경쟁 아닌 보완(주 통신 장애 시 독립 "전체 착륙" 채널). 안전이라는 명확한 셀링포인트.
4. RTCM over LoRa는 Emlid 등 상용 선례 존재 — 풀스택(옵션 A)도 N≤100 규모면 기술 성립.
5. **리스크**: KR920 EIRP/LBT(드론 고도=간섭 footprint 폭증, E22 22dBm 초과 가능성) 정식 조사 전 사업 확정 금지. 항공 규제는 운영사 영역으로 선긋기.

## 요청

- myWiki 사업방향에 "드론군무 LoRa" 탐색 트랙 등록 (조대홍 client 협의 결과가 게이트)
- 기존 인맥/사업 맥락에서 드론쇼·방제드론 수요 접점 있으면 역방향 공유 요망

## 참조

- lora vault `드론군무/` 전체 · log 2026-09-06 · memory [[drone-swarm-lora-review]]
