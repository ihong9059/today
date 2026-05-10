---
title: NotebookLM 슬라이드 시스템 (archive)
type: entity
status: archived
created: 2026-04-22
updated: 2026-05-10
archived: 2026-05-10
archived_to: ihong9059/ext (commit 7f69457, path nlm/)
tags: [NotebookLM, 슬라이드, YouTube, 자동화, Python, archived]
links: [skills, projects, ai-landscape]
---

# NotebookLM 슬라이드 시스템 (nlm) — archived

> ⚠️ **2026-05-10 archive**: 운용 중단(2026-02-18 마지막 활동) 시스템을 [`ihong9059/ext` repo의 `nlm/` 폴더](https://github.com/ihong9059/ext/tree/main/nlm)로 이동. today repo에서 제거. 부활 시 ext에서 가져오면 됨.

## 개요
YouTube 채널 영상을 자동 수집 → 요약 → PPTX 슬라이드 생성하던 파이프라인.

## 구성 (archive 시점)

### v3 channel-slides (현재 버전)
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

### 진화 이력 (ext repo `nlm/archive/`에 보존)
- v1 (`pitcast-project`): M4A 팟캐스트 (NotebookLM Audio Overview)
- v2 (`slide-agent-v1`): 통합 PPTX (모든 채널 1개로)
- v3 (`channel-slides`): 채널별 PPTX 분리

## 부활 시
```bash
git -C /tmp clone --depth 1 https://github.com/ihong9059/ext.git
cp -r /tmp/ext/nlm /c/todo/today/nlm
# myWiki에 raw/nlm junction 재생성, CLAUDE.md/index.md 항목 복구
```

## 관련
- [[ai-landscape]] — 채널에서 발견하던 AI 트렌드
- [[skills]] — Python 자동화 역량
- `/nlm` 슬래시 스킬 — NotebookLM 웹사이트 여는 별도 도구 (본 시스템과 무관, 계속 동작)
