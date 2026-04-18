# Do we call it a "micro PC?" - Raspberry Pi vs Latte Panda iota

## 영상 정보
- **채널**: Justin Garrison
- **재생시간**: 0:58 (YouTube Shorts)
- **링크**: https://www.youtube.com/shorts/cRUpdPzzezE

---

## 전체 요약

### 핵심 주제
Raspberry Pi 5를 Latte Panda iota로 교체한 이유와 두 보드의 비교 분석.

### 핵심 내용
1. **Raspberry Pi 졸업 선언**: 오랫동안 잘 사용했지만 이제 Latte Panda iota로 전환
2. **Latte Panda iota 장점**: UEFI BIOS 탑재, 64GB eMMC 내장, M2 슬롯 온보드, N150 벤치마크가 Pi 5의 약 2배
3. **가격 비교**: Pi 5(8GB) $100+ 부품 추가 vs iota(8GB) $130 올인원
4. **개선 희망사항**: GPIO 제거, 네트워크 카드 2.5Gbps 업그레이드

---

## 숫자 기반 인사이트

| 지표 | Raspberry Pi 5 | Latte Panda iota |
|------|---------------|-----------------|
| 가격 (8GB) | $100+ | $130 |
| M2 슬롯 | 별도 HAT 필요 (~$15) | 온보드 내장 |
| 쿨러 | 별도 구매 (~$6) | - |
| eMMC | 없음 | 64GB 내장 |
| 벤치마크 (N150) | 기준 | 약 2배 |
| 소비전력 | - | 8W |
| UEFI BIOS | 없음 (커스텀 부트로더) | 있음 |
| 크기 | 기준 | 약간 더 넓음 |

---

## 구간별 요약

### 1. Raspberry Pi 졸업 선언 (0:00-0:08)
[바로가기](https://www.youtube.com/shorts/cRUpdPzzezE&t=0s)

- Raspberry Pi를 그만 쓰기로 결정, Latte Panda iota로 이동
- iota는 8W만 소비하는 저전력 보드

### 2. 가격 비교 - 숨겨진 비용 (0:08-0:21)
[바로가기](https://www.youtube.com/shorts/cRUpdPzzezE&t=8s)

- Pi 5(8GB): $100 + M2 슬롯 HAT $15 + 쿨러 $6 = 계속 추가 비용 발생
- iota(8GB): $130 시작이지만 M2 슬롯, 64GB eMMC 내장

### 3. iota의 장점 (0:21-0:43)
[바로가기](https://www.youtube.com/shorts/cRUpdPzzezE&t=21s)

- N150 CPU 벤치마크가 Pi 5의 약 2배
- Pi보다 약간 넓은 크기
- **UEFI BIOS 탑재**: Pi 5의 커스텀 부트로더 문제 해소
- 배터리 필요하다는 단점 있지만, 커널 릴리스 대기 불필요

### 4. 개선 희망사항 (0:43-0:58)
[바로가기](https://www.youtube.com/shorts/cRUpdPzzezE&t=43s)

- GPIO 불필요 — 제거 희망
- 네트워크 카드 2.5Gbps 업그레이드 희망
- 이 두 가지가 바뀌면 "완벽한 작은 프로젝트 컴퓨터"

---

## 주요 인용구

> "I think I'm done with Raspberry Pies. They've served well over time."

> "The 8 gig IOTA starts at 130, which is the biggest downside here, but you get an M2 slot on the board."

> "Biggest thing that I love about it is the fact that it actually has a UEFI BIOS on it."

> "If this was 2.5 gig, no GPIO, it would be the perfect little project computer."

---

## 탐구형 질문

1. Latte Panda iota의 N150 CPU는 서버 용도(Docker, 홈서버)에서 Pi 5 대비 실제 체감 성능 차이가 얼마나 되는가?
2. UEFI BIOS 지원이 리눅스 서버 운영에서 어떤 실질적 이점을 주는가?
3. Pi 5의 에코시스템(HAT, GPIO, 커뮤니티)을 포기할 만한 가치가 있는 사용 사례는?

---

*요약 생성일: 2026-04-18*
