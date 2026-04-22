---
title: 위키 로그
type: log
created: 2026-04-19
updated: 2026-04-22
---

# Second Brain 위키 로그

## [2026-04-22] update | P1~P9 Wiki 개선 전체 완료
- experience.md: 4/20~4/22 활동 9개 항목 추가
- 서버인프라.md: 5대 서버 전수 조사 결과 반영, 요약 테이블 추가
- tailscale네트워크.md: IP 오류 수정, 3대 추가, 용도 컬럼
- goals.md: 단기 +4, 중기 +2, 완료 목표 6건, 핵심 질문 +1
- dashboard.md: dataview 대시보드 신규 생성 (6개 쿼리)
- raw/: webServer, 응원봉 junction 추가, CLAUDE.md 구조 업데이트
- Notion 연동 설계 완료 (Obsidian=원본, Notion=모바일 창구)
- obsidian-git 확인: data.json 없음, 자동 백업 미설정 상태

## [2026-04-22] thought | Wiki 운영 3일차 소감
- thoughts/2026-04-22_wiki-운영-소감.md: 유지 습관, Lint 한계(교차검증), 프로젝트 분리, 작업보고서 이원화, Claude+Obsidian 조합
- index.md: 새 thought 페이지 등록

## [2026-04-22] lint | Wiki 정합성 첫 점검
- Lint 전 항목 PASS (A+): 깨진 링크 0, 고아 0, 모순 0, 프론트매터 정상
- experience.md: 4/20~4/22 활동 반영 (9개 항목 추가)
- Wiki 작업보고서 체계 신설 (myWiki/작업보고서/날짜별/)
- /wiki-log Skill 생성, /work-end wiki 마무리 기능 추가

## [2026-04-19] update | Claude Design 발견 + Figma MCP 판단
- ai-landscape.md: Claude Design (2026-04-17, Opus 4.7) 추가
- ai-direction.md: 판단 로그 2건 (Claude Design 발견, Figma 학습 보류)
- gaps.md: 프론트엔드 디자인 갭 해결 방안 업데이트

## [2026-04-19] entity | Notion 연동 + 위시캣 수주 반영
- thoughts/2026-04-19_notion-연계.md: Notion 역할 분담 계획
- thoughts/2026-04-19_notion-data.md: Notion 첫 수집 + RPi Claude 아이디어
- 위시캣활동.md: #153090 스마트팜 수주 성공 추가 (주3회, 월500만)
- projects.md, gaps.md: 수주 정보 반영

## [2026-04-19] ingest | 10개 프로젝트 폴더 수집
- raw/ junction 10개 추가: 충전기, ai-education-web, aiHardStudy, cuda, doctor, homepage, revita, smartFactory, tailscale, xerix
- 신규 엔티티 7개: 충전기, 의료AI, cuda교육, tailscale네트워크, uttec-homepage, ai-education-web, aiHardStudy
- 기존 엔티티 3개 보강: revita (Zephyr 아키텍처), xerix (상세 기술), 스마트팩토리 (코드베이스)

## [2026-04-19] ingest | 영업 + 외벽로봇 자료 수집
- raw/영업, raw/외벽로봇 junction 링크 생성
- 영업 자료 5건 분석: 교육 SaaS, 스마트팩토리, 영업관리 마케팅 계획서
- 외벽로봇 자료 3건 분석: 컨셉 분석, 개선 설계, ESP32 모바일 리서치
- entities/영업전략.md, entities/외벽로봇.md 생성

## [2026-04-19] entity | 엔티티 페이지 11개 생성
- 사전빌드, python-vibe, uttec-edu, claude-code, ai-fanstick
- xerix, revita, 위시캣활동, 스마트팩토리, 양산제품, 서버인프라
- 각 엔티티가 핵심 위키 페이지들과 상호 연결 (총 60개+ 링크 추가)
- 인덱스 업데이트

## [2026-04-19] ingest | 작업보고서 전체 수집 (2025-12 ~ 2026-04)
- 110개+ 작업보고서 분석 (12월 17개, 1월 33개, 2월 29개, 3월 29개, 4월 19개)
- experience.md 대폭 보강: 월별 핵심 활동 타임라인 추가
- projects.md 대폭 보강: 완료/운영 프로젝트 10개+, 이월 항목 패턴 발견
- skills.md 대폭 보강: 사용 빈도 + 양산 제품 5개 목록 추가
- ai-direction.md 보강: 판단 로그 14건, 위시캣 시장 인사이트 추가
- strengths.md 보강: 실적 증거 + 작업 패턴 강점 추가
- gaps.md 보강: 이월 패턴, 계획 vs 실행 불일치, 시장 미스매치 발견
- ai-landscape.md 보강: 검증된 도구 조합 5세트 추가

## [2026-04-19] ingest | 위시캣 지원서 수집 (2026-02 ~ 2026-04)
- 16건 지원서 분석 (2월 2건, 3월 8건, 4월 6건)
- ai-direction.md에 위시캣 시장 인사이트 + 차별화 전략 추가
- 지원서 진화 패턴 발견: 단순→아키텍처→갭분석
- 핵심 브랜딩: "38년 경력 + 5개 양산 제품"

## [2026-04-19] init | 위키 초기 구축
- 스키마(CLAUDE.md) 작성
- 핵심 페이지 9개 생성: me, skills, experience, projects, goals, ai-landscape, ai-direction, strengths, gaps
- 첫 번째 생각 페이지 작성
- 인덱스 생성
- raw/ 폴더 구조 구축 (위시캣, 작업보고서 junction 링크)
