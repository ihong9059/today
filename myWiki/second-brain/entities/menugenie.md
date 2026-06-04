---
title: MenuGenie — 대화형 AI 음식 주문 SaaS
type: entity
created: 2026-06-04
updated: 2026-06-04 (사용자 신사업 확정 통보 + 홈페이지 초안 확인 + entity 신설)
tags: [신사업, SaaS, B2B, 요식업, AI, GCP, Gemini, 라즈베리파이, 대화형, 키오스크, Tier3-후보, draft]
links: [me, skills, 서버인프라, 영업전략, uttec-homepage, ai-fanstick, onDevice-ai, 양산제품]
---

# MenuGenie — 대화형 AI 음식 주문 SaaS

## 한 줄 정의
UTTEC 신사업 — **요식업 사장님 대상 B2B SaaS**, 키오스크 + 대화형 AI 주문 시스템. 2026-06-04 사용자 통보 + 홈페이지 초안(GCP 34.64.255.74) 발견 + 본 entity 신설.

## 상태 (2026-06-04 시점)

| 항목 | 값 | 출처 |
|---|---|---|
| 사업 단계 | **초안** (사용자 "내용은 가동 안합니다") | 사용자 6/4 메시지 |
| 홈페이지 | http://34.64.255.74 (HTTP, self-signed cert, GCP) | curl 검증 |
| Version 표기 | "정식 1.0" (공지사항 05-20) | 홈페이지 HTML |
| 소스 위치 | ❓ **확인 필요** (local repo 미발견 — today/uttecHome/wishket/onDevice/lemonLabs 모두 0 hit) | grep 검증 |
| Tier 분류 | **Tier 3 후보** (자체 codebase + 별도 host = GCP) — 단 검증된 코드량 부재로 잠정 | second-brain CLAUDE.md 정책 |

## 제품 정의 (홈페이지 HTML 검증)

### 헤드라인
- **"키오스크와 대화의 만남, 스마트 주문의 시작"**
- 부제: "요식업 사장님들을 위한 혁신적인 대화형 AI 주문 솔루션. 매장 관리가 더 쉽고 똑똑해집니다"

### 메뉴 구조 (4축)
1. **시연영상** — 현재 YouTube placeholder (`dQw4w9WgXcQ` = Rickroll, 2026-06-04 사용자 교체 지시)
2. **공지사항** — 1.0 출시(05-20) / GCP 이전 안내(05-18) / 개인정보 처리방침(05-10)
3. **사용설명서** — 초기 설치 가이드 PDF / **RPi 로컬 서버 연동 매뉴얼** / 대화형 AI 명령어 커스텀 / POS·주방 모니터 연동
4. **회원가입** — B2B 검증 모달 (요식업 사업자등록증 보유 필수)

### CTA 2개
- **소프트웨어 다운로드 (Ver 1.0)** — local install 패키지
- **가맹점 등록 신청** — 매장 연동 승인 절차

### 인프라 (Footer 명시)
- **Google Cloud Platform** (배포 host)
- **Gemini AI Management** (대화 AI 엔진)
- 매장 측 **라즈베리파이 로컬 서버** (POS·주방 모니터 연동 carrier)

## UTTEC 강점 정합성 (entities 횡단)

| MenuGenie 필수 영역 | UTTEC 보유 자산 | entity 참조 |
|---|---|---|
| RPi 로컬 서버 + 사내 네트워크 | RPi 3~5 + Zero + Tailscale 6대 mesh + RPi 3+Nginx 사내 인트라넷 패턴 | [[서버인프라]] [[tailscale네트워크]] |
| POS·주방 모니터 연동 | BLE Mesh + Modbus + RS485 양산 (AMANO 3,800대 / 한림용인CC) | [[양산제품]] [[skills]] |
| 대화형 AI 명령어 커스텀 | n8n + Claude API + Ollama 로컬 (마스킹 4중 방어 patterns) | [[n8n-uttec]] [[claude-code]] |
| B2B 사장님 영업 narrative | 한국기계 AI 교육 보안 4중 방어 narrative (1순위 우려 = 외부 노출) | [[영업전략]] [[uttec-edu]] |
| 모바일 앱 + AWS 서버 양산 | Android 3 + Flutter 4 + AWS IoT Core/DynamoDB/Lambda (#155818 wishket cascade 박제) | [[양산제품]] (6/4 cascade 흡수 예정) |

## 차별화 가설 (검증 carry — 사용자 답변 대기)

1. **Gemini → Ollama/Claude 마스킹 옵션** — 한국기계 narrative와 동일 (사내 데이터 외부 노출 우려). 요식업 사장님 메뉴/매출/고객 데이터도 동일 issue.
2. **RPi 로컬 = 오프라인 동작 보장** — 인터넷 끊겨도 매장 주문은 계속 (UTTEC 강점)
3. **POS·주방·키오스크 통합** — 단일 업체 한 팀 (외주 0%) = #155818 cascade 같은 메시지

## 의문점 (사용자 확인 필요) ⚠️

1. **소스 코드 위치** — local repo 발견 0건. GCP 서버 직접 편집? 별도 GitHub repo? Tier 3이면 별도 `/todo/menugenie/` vault 필요할 수도.
2. **Gemini 종속 vs UTTEC 마스킹 narrative 일치 여부** — footer 명시 "Powered by Gemini" → 영업전략 4중 방어와 정합?
3. **Tier 분류 결단** — 초안 단계라 Tier 1로 시작 후 승격? 또는 Tier 3 즉시?
4. **사업자 등록 / 운영 주체** — UTTEC 직접? 별도 법인? lemonLabs 같은 파트너십?
5. **시범 매장 / pilot 고객 유무** — 1.0 출시 공지 = pilot 운영 중인가? 또는 출시 announcement only?
6. **모바일 앱 (Android/iOS)** — 사장님용 app? 손님용 app? 또는 키오스크 전용?

## 즉시 todo (다음 megasession 후보)

- [ ] **Rickroll URL → 실제 데모 영상 URL 교체** (사용자 6/4 지시) — 소스 위치 확인 필요
- [ ] 사용자 답변 후 의문점 6건 박제
- [ ] Tier 분류 결단 (Tier 1 vs Tier 3 즉시)
- [ ] 영업전략.md "사업 라인" 추가 (조명/주차장/팩토리/응원봉/교육 + **요식업 SaaS** 6번째)
- [ ] 회사소개.md "사업 영역" 6 → 7 갱신 검토
- [ ] strengths.md §15 SaaS 자산 신설 검토 (코드량 검증 후)

## 관련 myWiki 페이지

- [[me]] — 풀스택 단일 업체 narrative
- [[skills]] — RPi + AI + AWS + 모바일 앱 양산 자산
- [[서버인프라]] — GCP VM + Nginx + RPi 6대 사내 mesh
- [[영업전략]] — 보안 4중 방어 narrative + 정부지원 연계
- [[uttec-homepage]] — UTTEC 회사 홈페이지 (별개 vault, 본 entity와 다른 product)
- [[ai-fanstick]] — UTTEC own product 1번째 사례, MenuGenie는 2번째 own product 후보
- [[onDevice-ai]] — Stage 4 제품 통합, MenuGenie 키오스크 단말도 Stage 4 carrier 후보
