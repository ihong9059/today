---
title: AI 기술 지형도
type: ai
created: 2026-04-19
updated: 2026-05-14
tags: [AI, 트렌드, 관찰, HBM, 메모리시대]
links: [ai-direction, skills, goals, 2026-05-14_AI-메모리시대-김정호KAIST]
---

# AI 기술 지형도 (내 관점)

## AI 반도체 — 메모리 시대 전환 (2026-05 추가)

**출처**: 김정호 KAIST 교수 강연 ([[2026-05-14_AI-메모리시대-김정호KAIST]])

- **패러다임**: 사전학습(GPU 중심) → **추론(메모리 중심)** 시대로 작년 여름(2025-여름) 전환
- **GPU 한계 도달**: 발열로 적층 불가, 통신 지연으로 N개 이상 부착 시 손해. NVIDIA는 HBM 4개, AMD MI455X는 16개 — 리사 수가 기술 방향에 더 정직
- **KV 캐시 폭증**: 컨텍스트² + 백그라운드 세션 + 멀티 에이전트로 8배 증가. 김 교수 추산 1인당 1,000PB 메모리 필요
- **HBM 로드맵**: HBM4(베이스다이에 GPU 일부 통합) → HBM5(GPU를 옥상으로) → HBM7(HBF 부착, 100~1,000TB)
- **메모리 센트릭 컴퓨팅**: CPU/GPU 거치지 않는 메모리 자체 네트워크 — KAIST 실험 결과 405B 모델 추론 스루풋 100배
- **2038년 예측**: HBF(High-Bandwidth Flash) 인퍼런스 전용 메모리 시장 폭증
- **수혜**: SK하이닉스, 삼성전자, 샌디스크(NVIDIA IGMS 채택). 그러나 NVIDIA는 IGMS/DPU로 메모리 의존도 낮추려는 중

**UTTEC 관점에서의 함의** (대각선 포지션):
- 클라우드 AI: 메모리·전기·토큰 비용 폭증 → 운영비 부담 증대
- **온디바이스 AI**: 토큰 0개 생산, 외부 인터넷 0%, 전기 비용 무관 → 메모리 시대의 대척점에서 차별화 가능
- 영업 카피화: *"AI 시대 돈은 메모리가 번다 — 그런데 메모리 비용 없는 AI도 있다."*

## 현재 관찰 (2025-12 ~ 2026-04)

### LLM / 코딩 AI
- Claude Code: 내 핵심 도구. Skill 시스템까지 구축하여 워크플로우 자동화
- Claude Opus 4.6 (1M context) — 대규모 코드베이스 전체를 한 번에 처리 가능
- **Claude Design (2026-04-17 출시)**: 텍스트→디자인 생성, 프로토타입, 슬라이드, 원페이저. Opus 4.7 기반. Pro 이상 무료. Figma 대체 가능성 높음
- AI 코드 생성 품질이 실용 수준 도달 → "바이브 코딩" 실현
- Haiku→Sonnet 전환으로 펌웨어 1차 빌드 성공률 대폭 향상 (경험적 확인)
- 다중 LLM 활용: Claude CLI, GPT-4o-mini, Gemini 2.0 Flash, Groq

### AI + 교육
- AI가 코드를 생성하고 설명하는 교육 흐름 실현 (Python Vibe)
- 전통적 "코딩 문법 교육"의 가치 하락 중
- "AI와 협업하는 능력" 교육이 새로운 수요
- Remotion + edge-tts로 교육 영상 대량 생산 가능 (30편+)
- Google Colab으로 ML 실습 노트북 배포 가능

### AI + 하드웨어
- AI가 펌웨어 코드를 생성할 수 있지만, 물리적 제약/디버깅은 인간 영역
- 사전빌드: AI 코드 생성 → 자동 빌드 → OTA 전송 파이프라인 실현
- ESP-IDF보다 Arduino 프레임워크가 AI 코드 생성에 더 적합 (경험적 확인)
- xTaskCreate는 setup()에서만 호출 — AI가 잘 모르는 하드웨어 규칙

### AI + 프리랜서 시장
- 단순 웹/앱 개발 단가 하락 진행 중
- 위시캣 시장에서 임베디드 프로젝트는 소수이나, 지원자도 적음
- HW+SW 통합 능력 + 양산 실적이 핵심 차별화 요소
- 지원서 품질이 진화 중: 단순 스킬→아키텍처 설계→갭 분석 포함

### AI + 콘텐츠 제작
- Remotion (코드 기반 영상) + edge-tts (TTS) = 영상 자동 생산 파이프라인
- Midjourney/DALL-E로 마케팅 이미지 생성 (AI FanStick 21개 프롬프트)
- NotebookLM으로 리서치/학습 자료 정리
- Playwright로 HTML→PDF 자동 변환

### AI + 산업
- 스마트팩토리 AI: 예지정비, 품질검사, 파쇄기 AI (85억 규모 제안)
- 시계열 모델: Prophet, LSTM, TFT, XGBoost, ARIMA 시뮬레이션 경험
- 볼트 품질검사: MobileNetV3 (재현율 100%)
- 번호판 인식: EasyOCR (90%) > Tesseract (20%)

## 내가 주시하는 기술
- [ ] Claude Code 새 기능 / 업데이트
- [ ] MCP (Model Context Protocol) — AI 도구 연동 표준
- [ ] 온디바이스 AI (Jetson, 엣지 AI)
- [ ] AI 에이전트 프레임워크 (Claude Agent SDK)
- [ ] AI + 임베디드 통합 (ESP32에서 AI 실행)

## 검증된 도구 조합
| 용도 | 도구 조합 | 상태 |
|------|----------|------|
| 펌웨어 자동 생성 | Claude CLI + Arduino-CLI + prebuild.py | 운영 중 |
| 교육 영상 제작 | Remotion + edge-tts + Claude Code | 운영 중 |
| 코딩 교육 | Python Vibe + Claude CLI + sandbox | 운영 중 |
| 문서/제안서 | Claude Code + Markdown + Playwright(PDF) | 운영 중 |
| 센서 모니터링 | Flask + Three.js + 실시간 데이터 | 운영 중 |

## 업데이트 주기
새로운 AI 트렌드를 관찰하거나 경험할 때마다 이 페이지를 업데이트한다.
분기별 1회 이상 전체 점검.

## 관련 페이지
- [[ai-direction]]: 이 지형도를 기반으로 한 방향 판단
- [[skills]]: 내가 보유한 기술과의 교차점
- [[goals]]: AI 트렌드가 목표에 미치는 영향
