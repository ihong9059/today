---
title: NotebookLM 슬라이드 시스템
type: entity
created: 2026-04-22
updated: 2026-04-22
tags: [NotebookLM, 슬라이드, YouTube, 자동화, Python]
links: [skills, projects, ai-landscape]
---

# NotebookLM 슬라이드 시스템 (nlm)

## 개요
YouTube 채널 영상을 자동 수집 → 요약 → PPTX 슬라이드 생성하는 파이프라인.

## 구성

### channel-slides 시스템
- **수집**: 등록 채널 4개의 최신 영상 자동 탐지 (3~7일 자동 확장)
- **분석**: 자막 추출 → 요약 → NotebookLM 합성
- **생성**: 채널별 최대 10슬라이드 PPTX (다크 테마 3D 시네마틱)

### 등록 채널
| 채널 | 주제 |
|------|------|
| Nate Herk | AI 비즈니스 |
| Nick Saraev | AI 자동화 |
| Jack Roberts | AI 도구 |
| Chase H AI | AI 트렌드 |

### Python 에이전트
- research agent — 영상 탐색
- synthesis agent — 내용 합성
- slide agent — PPTX 생성

## 관련
- [[ai-landscape]] — 채널에서 발견한 AI 트렌드
- [[skills]] — Python 자동화 역량
