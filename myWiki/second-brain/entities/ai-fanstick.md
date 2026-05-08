---
title: AI FanStick (응원봉)
type: entity
created: 2026-04-19
updated: 2026-05-08
tags: [프로젝트, 제품, 특허, 블루오션, 정지선]
links: [ai-direction, experience, me, projects, skills, strengths, onDevice-ai-검증, 2026-05-08_응원봉-온디바이스AI-정지선]
---

# AI FanStick (응원봉)

## 한 줄 정의
AI 음성 비서 + LED 응원봉 + BLE 통합 제품. K-POP 1.5억+ 팬덤 타겟. **특허 출원 완료.**

## 왜 중요한가
- 블루오션 확인: BTS ARMY Bomb, SM Beyond Live, PixMob 모두 AI 통합 없음
- [[ai-direction|AI 방향]]에서 "AI + 하드웨어 제품화"의 첫 사례
- 2주 만에 리서치→MVP→특허까지 완료 — [[strengths|실행 속도]] 증명

## 현재 상태
- MVP 코드 완성 (ESP32-C3 + BLE + Android + FastAPI)
- 특허 출원 문서 작성 완료 (7개 다이어그램)
- 마케팅 이미지 프롬프트 21개 (Midjourney/DALL-E)
- 사용설명서 v2.1

## 기술 스택
- ESP32-C3: WS2812 RGB LED + BLE
- Android: Kotlin/Compose + Retrofit
- 서버: FastAPI + Gemini 2.0 Flash + GPT-4o-mini (듀얼 AI)
- BLE 통신: 텍스트 입력 + WebSocket 재연결

## 타임라인
| 날짜 | 마일스톤 |
|------|---------|
| 2/12 | 컨셉 + 시장 조사 시작 |
| 2/16 | 마케팅 이미지 프롬프트 21개 |
| 2/21 | 사업 계획서 |
| 2/24 | 작동 원리 상세 문서 |
| 2/25 | MVP 전체 코드 완성 |
| 2/27 | 특허 출원 문서 완성 |
| 4/17 | 앱 개선 (텍스트 입력, WebSocket) |

## 양산 방향 잠금 (2026-05-08)

응원봉 양산은 **"스마트폰 Gemma 2B + Cloud Gemini 하이브리드"**로 방향 고정. 응원봉 본체는 BLE 명령 수신·LED 제어만.

근거:
- newMvp/온디바이스_AI_검토서(2026-02-27) §10 결론과 일치
- onDevice_AI_검증(2026-05-08) microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달
- 양산 칩 교체(ESP32-C3 → ESP32-S3-N16R8) +1,500원/대 = 5만 대 +7,500만 BOM, 사용자 가치 미입증

자세한 정지선: [[2026-05-08_응원봉-온디바이스AI-정지선]]
1차 자료: `응원봉/마케팅검토/2026-05-08_온디바이스AI_정렬도검토.md`

## 마케팅 카피 분리 정책

| 청자 | 카피 |
|---|---|
| C2C 응원봉 사용자 | "AI 팬덤 비서가 내 손 안에" / "오프라인에서도 작동하는 첫 응원봉" |
| B2B (Stage 4) | "응원봉 자체에 GPT 탑재한 첫 사례" (검증 트랙 산출물 활용) |
| PR/언론 | "1만원 칩에 GPT 200줄 — UTTEC 한국 최초 시연" |
| 강의 | "임베디드 엔지니어를 위한 On-Device AI" |

**중요**: B2B/PR 카피를 C2C 사용자 마케팅에 쓰지 말 것 (기대 격차 클레임 위험).

## 관련 페이지
- [[me]]: 사업가/발명가 정체성
- [[projects]]: 완료 프로젝트
- [[skills]]: ESP32 + BLE + Android + AI API
- [[ai-direction]]: AI+HW 제품화 사례
- [[strengths]]: 폭발적 실행 속도 증거
- [[experience]]: 제품화 경험
- [[onDevice-ai-검증]]: 별도 트랙 (PR·B2B·강의 자산용)
- [[2026-05-08_응원봉-온디바이스AI-정지선]]: 정지선 의사결정 기록
