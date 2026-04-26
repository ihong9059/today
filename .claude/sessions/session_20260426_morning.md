# Session Report - 2026-04-26 오전~오후

## 작업 요약
초등학교 교안 제작 + AI 교육 커리큘럼 전면 재설계 (Track 1~4 Claude Code 중심) + Obsidian/Wiki 정비

## 완료된 작업
- 이력서 신상정보 추가 (생년월일, 연락처, 이메일, 주소, 학력) + PDF 재생성
- 초등학교 교안 4주 버전 작성 (교안_4주_AI바이브코딩.md/html/pdf)
- 김포나진초등학교 정보 조사 + 학년별 학급/학생수 정리 (html/pdf)
- kit설명서.png 복사 (장민하 → 초등학교강의)
- obsidian-git data.json 설정 (자동 백업 5분 pull / 10분 push)
- Obsidian 설정 변경 — raw/ md파일만 추적 (코드/바이너리 제외)
- 7개 프로젝트 README.md 생성 (aiStudy, ffmpeg, homepage, nlm, remotion-project, smartFactory, 위시캣)
- AI 교육 커리큘럼 4 Track 전면 재작성 (Claude Code 중심)
  - Track 1: 5개 카테고리 (초등학생/직장인/개발자/교사/주부)
  - Track 2: Claude Code + Python + aiPython 연동
  - Track 3: Claude Code + 서버/Docker/CI-CD
  - Track 4: Claude Code + PyTorch/YOLO/LPR
- Track 1 Day별 실습 자료 50개 완성 (5카테고리 × 10일)
- AI 도구 활용 가이드 작성 (70+ 도구 정리)
- 삼환 제안서 최종 검토 완료 (작업보고서 반영)

## 진행 중인 작업
- 위시캣 클라이언트 응답 확인 (#154780 계약 등) — 대기 중

## 다음에 할 일
- Track 2~4 Day별 실습 자료 제작 (Track 1처럼 상세하게)
- 동시 빌드 문제 해결 (10명+ 대비)
- aiS3 (C6-LCD) 사전빌드 시스템 구축
- 사전빌드 항목 1~5번 사무실 보드 재확인
- lcd용 교육 server setup for company rpi4
- 위시캣 클라이언트 응답 확인

## 중요 정보
- UTTEC 보드 명칭: aiHardStudy 내에서는 ESP32 → UTTEC 보드로 통일
- 2대 PC 동시 사용: today 저장소 git 충돌 주의, obsidian-git pull 5분 간격
- 김포나진초등학교: 경기도 김포시 걸포동, 4~6학년 27학급 672명
- 커리큘럼 구조: 4 Track × 14주, Track 1은 5개 카테고리별 Day 자료 완성

## 관련 파일
- aiHardStudy/초등학교강의/ (이력서, 교안 4주, 학교정보, kit설명서)
- aiStudy/커리큘럼/ (Track 1~4 폴더, 자료/)
- aiStudy/커리큘럼/Track1_업무활용/ (A~E 카테고리, 각 Day01~10)
- myWiki/.obsidian/app.json (raw/ md만 추적)
- myWiki/.obsidian/plugins/obsidian-git/data.json (자동 백업 설정)
- 작업보고서/2026-04-25_작업보고서.md
