---
title: 부족한 부분
type: identity
created: 2026-04-19
updated: 2026-04-19
tags: [부족, 개선, 학습]
links: [me, skills, ai-direction, strengths, goals]
---

# 부족한 부분 (채워야 할 것)

## 기술적 갭

### 딥러닝/ML 심화
- MNIST(99.32%), 볼트 검사(MobileNetV3) 수준 — 모델 설계/학습 직접 경험 제한적
- 현재 대응: Google Colab + 교육용 노트북 13개로 실습 중
- 필요 시점: 온디바이스 AI 사업 확장 시

### 프론트엔드 디자인
- 기능은 구현하지만, 시각적 디자인 품질이 부족
- **Claude Design (2026-04-17 출시)로 해결 가능**: 텍스트→디자인, 프로토타입, 슬라이드 생성
- Figma MCP 학습은 불필요 — Claude Design이 더 간단하고 통합적
- 다음 단계: Claude Design 실제 사용해보기

### 비즈니스/마케팅
- 기술 구현에 비해 사업화/수익화 경험 부족
- 위시캣 외 영업 채널 다양화 필요
- 위시캣 시장에서 임베디드 매칭률이 매우 낮음 (5% 미만)

### MCP / AI 에이전트
- Claude Code Skill은 활용하지만, MCP 서버 직접 개발 경험 없음
- AI 에이전트 프레임워크 학습 필요

## 구조적 갭

### 동시성/확장성
- 동시 빌드 문제 미해결 (교육 현장 10명+ 동시 사용)
- 단일 서버 구조의 한계
- 큐 시스템/워커 풀 도입 필요

### 지속적 이월 패턴
작업보고서 분석에서 발견된 패턴:
- **관리/행정 업무가 기술 개발에 밀려 지속 후순위**
- Pi B3 Docker (19일+ 이월 후 소멸)
- 회사소개서, 홈페이지 콘텐츠 (이월 반복 후 소멸)
- Notion MCP 연동 (이월 반복)
- Google Play 배포 (이월 반복)
- **대응**: 관리 업무를 배치로 처리하는 주간 루틴 도입 검토

### 계획 vs 실행 불일치
- 할일 0% 달성 + 신규 작업 100% 달성하는 날이 반복
- 계획된 작업보다 즉흥적 기술 작업에 끌리는 성향
- **대응**: 필수 관리 업무는 아침에 먼저 처리

### 문서화/체계화
- 빠른 실행의 이면: 문서화가 뒤따라가지 못함
- 이 Second Brain 위키가 그 갭을 채우는 시도

## 위시캣 시장 갭

### 시장 미스매치
- 위시캣 시장은 웹/앱/디자인이 대다수
- 임베디드/IoT는 소수 → 328건 검토해도 매칭 0~2건/주
- **대응**: 다른 채널 탐색 (직접 영업, 산업 전시회, 기술 블로그)

### 수주 결과 추적 부재
- 16건+ 지원 중 1건 수주 확인 (#153090 nRF52 스마트팜, 진행 중)
- 나머지 15건의 결과(수주/탈락) 미추적
- **대응**: 지원 결과를 체계적으로 추적하여 성공 패턴 분석

## 현장 배포 함정 패턴 (2026-05-12 신설 — revitaWiki ingest #8 흡수)

> "1인이 직접 시공·운용까지 하는 사업 모델"에서 **현장 배포 첫 24시간에 만나는 함정**들. 강의·교재 자산으로도 활용 가치 ★★★.
> 출처: `revitaProject/application/revitaWiki/improvement/gotcha-*.md`

### USB 동글 식별 충돌 (CP2104 S/N 동일)

같은 모델 USB-UART 동글들이 공장 출고 시 **동일 시리얼 번호**를 가짐. `/dev/ttyUSB0` 같은 단순 매핑은 부팅마다 달라짐.
- **회피책**: USB 허브 물리 포트로 구분 → `udev rule`에 `ID_PATH` 사용 / 라벨 부착 / 최후의 수단으로 EEPROM 재프로그래밍
- **대응 정책**: 양산·현장 시리얼 매핑 시 처음부터 ID_PATH 기반 udev rule 작성
- **관련 프로젝트**: revita Solar Monitor (5/12 진단), 골프수조·AISG 등 다수 동글 운용 시 동일

### RPi USB Undervoltage (현장 배포 핵심 함정)

라즈베리파이 USB 허브 전원 부족 시 **새 장치 인식 실패 + 기존 file descriptor `(deleted)` 상태**로 빠짐. 외관상 정상이지만 통신 실패.
- **회피책**: **powered USB hub 필수** + 공식 어댑터 사용 + `vcgencmd get_throttled` 정기 모니터링
- **대응 정책**: 농촌·외부 배포 시 전원 마진 사전 측정
- **관련 프로젝트**: revita Solar (5/12 발생), [[한림용인cc-고가수조]] (시공 직전 — 사전 회피 필요)

### 외부 CDN 의존 (Chart.js CDN 오프라인)

라즈베리파이 현장 환경의 인터넷 불안정 → 외부 CDN(jsdelivr 등) 접속 실패 → Web UI 차트 로딩 안 됨.
- **회피책**: 정적 자원 **로컬 호스팅 정책** (`static/chart.min.js` 직접 포함)
- **부수 함정**: Flask deque maxlen / 템플릿 캐시도 비슷한 함정
- **대응 정책**: 현장 배포 Web UI 모든 프로젝트에 일반화 — AISG·골프수조·smartFactory 등
- **관련 프로젝트**: revita Solar (5/11 정책 확정)

→ **이 3건은 강의 콘텐츠 자산**: 호오컨설팅·인프런·강사양성 교재의 "1인 시공 함정 패턴" 사례. [[한림용인cc-고가수조]] 시공 시 사전 회피 체크리스트로 활용.

## 자동화/스크립팅 함정 패턴 (2026-05-15 신설 — onDevice_AI ingest #1 흡수)

> Claude Code multi-agent + n8n 자동화 본격 도입(5/15 megasession)에서 발견된 셸·자동화 영역 함정. 강의 자산으로도 활용 가능.

### bash heredoc 변수 expansion 손실 (n8n expression 사고)

`<<EOF` (no quote) 사용 시 shell이 heredoc 내부 `$json.var` 같은 변수를 자기 변수로 해석하여 **expansion 후 빈 문자열 또는 임의 값으로 치환됨**. n8n expression 같은 외부 DSL을 heredoc으로 전달할 때 expression이 통째로 손실됨.
- **회피책**: **단일 quote heredoc 표준** — `<<'EOF'` (앞에 따옴표). 또는 `\$` 백슬래시 escape.
- **대응 정책**: shell heredoc으로 외부 DSL/JSON/SQL 전달 시 무조건 `<<'EOF'`. 가독성 차이 미미, 사고 차이는 큼.
- **관련 사례**: 5/15 n8n Test_Ubuntu_n8n 워크플로우 import 시 expression 손실. import 성공 후 trigger 결과 값이 빈 문자열로 들어와서 발견 (사후 진단).

### Mac↔Windows·Linux Python 버전 차이 (n8n npm 회피 → Docker)

Ubuntu에 `npm install -g n8n` 시 latest는 Node 22 강제 (NodeSource Node 20 호환 한계) → npm은 자동으로 호환 마지막 버전인 2.8.4로 fallback. 즉 **silent downgrade**.
- **회피책**: n8n는 **Docker 패턴 표준** (revita odroidc2와 일관). Node 격리 + 워크플로우 마이그레이션 호환.
- **대응 정책**: 서버에 nodejs 도구 설치 시 Docker로 격리하는 패턴을 1순위. npm 글로벌 install은 2순위.
- **관련 사례**: 5/15 Ubuntu Mac→리눅스 컨버전 후 n8n 셋업. npm 2.8.4로 1회 가동 후 Docker 2.20.7-exp.0로 마이그레이션 (~30분 소요).

### Gmail App Password 채팅 노출

Claude 세션 중 SMTP 셋업하면서 App Password를 평문으로 노출. Anthropic 로그·Notion sync 등 잠재 경로에 영구 박제 가능.
- **회피책**: 민감 토큰은 **별도 채널** (PC 직접 키 등록 + Claude는 "이미 등록함" 정도만 통보).
- **대응 정책**: App Password / API key / DB password 등은 처음부터 환경변수 파일에 두고 Claude에게는 파일 경로만. 한 번 노출되면 즉시 폐기 + 재발급.
- **관련 사례**: 5/15 megasession Gmail App Password `rdachuzebgzoappa` 노출 → 폐기 권장 박제 (작업보고서 5/15 § 중요 정보).

→ **이 3건은 자동화 강의 자산** + 1인 운영 함정 시리즈에 추가 가능. multi-core/AI 자동화 코스 사례로 직접 활용.

## 업데이트 방법
새로운 갭을 발견하거나, 기존 갭을 채웠을 때 이 페이지를 업데이트한다.
채운 갭은 삭제하지 않고 ~~취소선~~으로 표시하여 성장 기록을 남긴다.

## 관련 페이지
- [[me]]: 핵심 정체성
- [[skills]]: 기술적 갭과 현재 수준 비교
- [[ai-direction]]: 갭이 AI 방향에 미치는 영향
- [[strengths]]: 강점과 약점의 대비
- [[goals]]: 갭을 채워야 달성되는 목표
