---
title: AI Education Web (코드베이스)
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, 코드, 교육, 웹]
links: [cuda교육, projects, skills, uttec-edu, 서버인프라]
---

# AI Education Web (코드베이스)

## 한 줄 정의
[[uttec-edu]] 플랫폼의 실제 소스 코드. Python/AI 기초부터 신경망까지 가르치는 웹앱.

## 기술 스택
- Next.js 16.1 + React 19 + TypeScript
- Tailwind CSS 4
- react-markdown + rehype-katex (수학/LaTeX 렌더링)
- react-syntax-highlighter (코드 하이라이팅)
- lucide-react (아이콘)

## 구조
```
src/app/
├── page.tsx          (홈)
├── curriculum/       (커리큘럼 페이지)
├── lesson/[id]/      (개별 레슨)
├── level/[id]/       (레벨별 콘텐츠)
├── roadmap/          (학습 로드맵)
├── transformer/      (트랜스포머 설명)
├── guide/            (가이드)
├── report/           (리포트)
└── admin/analytics/  (GA4+YouTube 관리)
```

## 교육 철학
> "암기하지 말고 이해하라" — 모든 개념을 AI 응용과 연결

## 핵심 콘텐츠
- Level 0: Python 기초
- Level 1: AI 이론
- Level 2: 실습 프로젝트
- Level 3~9: 심화 (CNN, RNN, 전이학습 등)

## 배포
- DigitalOcean + PM2
- `.env.local` 설정됨
- YouTube 통계 추적 API 포함

## 관련 페이지
- [[uttec-edu]]: 상위 교육 플랫폼 설명
- [[projects]]: 프로젝트 맵
- [[skills]]: Next.js, React, TypeScript
- [[서버인프라]]: 배포 인프라
- [[cuda교육]]: GPU/CUDA 교육 보완
