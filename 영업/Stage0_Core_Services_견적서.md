---
title: "Stage 0 — UTTEC Core Services Starter Pack 견적서"
type: quotation
created: 2026-05-05
updated: 2026-05-05
tags: [견적서, stage0, core-services, 영업자료, palantir, foundry]
links: [Core_Services_무료대체_매핑, n8n_실행_가이드, 영업전략, UTTEC_사업분야_종합]
---

# 견적서 — UTTEC Core Services Starter Pack

> **한 줄 가치**: Palantir Foundry 1층(Core Services) 인프라를 **1주에 500만원**으로 깔아드립니다. 만족 시 Stage 1~3 본격 도입, 아니면 1주 후 모든 자료 인계 후 종료.

---

## 1. 수신 정보

| 항목 | 내용 |
|------|------|
| 수신 | (고객사명) |
| 담당자 | (담당자명 / 직급) |
| 발송 | UTTEC 이형근 (ihong9059@gmail.com) |
| 견적일 | 2026-05-05 |
| 유효기간 | 견적일로부터 30일 |
| 작업 기간 | 5영업일 (셋업 3일 + 검증·교육 2일) |

---

## 2. 패키지 개요

**UTTEC Core Services Starter Pack** — 5,000만원급 Palantir Foundry 1층 기능을 오픈소스/Free 도구로 구축. 데이터 사일로 해체 + 비코더 협업 인프라 + 자체 호스팅 보안을 1주에 완성.

**대체 매핑 (Palantir Foundry → Free Tools)**

| Foundry Core Services | 대체 도구 | 라이선스 비용 |
|----------------------|----------|--------------|
| IAM (계정·권한) | Tailscale ACL + OS 권한 | 0원 (100대 무료) |
| Storage (저장소) | Git + Obsidian Vault | 0원 |
| Security (암호화) | Tailscale WireGuard | 0원 (내장) |
| Audit (감사 로그) | git log + 작업보고서 자동화 | 0원 |
| Catalog (메타) | Obsidian + Wiki Lint | 0원 |
| API Gateway | n8n Webhook | 0원 (Self-host) |
| Collaboration | Slack/카카오워크 (기존) | 기존 사용 |
| **Total** | **모두 Free / Self-host** | **별도 라이선스 0원** |

---

## 3. 산출물 (6종)

| No | 산출물 | 내용 |
|----|--------|------|
| 1 | **Tailscale 메시 네트워크** | 고객사 PC 5~20대 Zero Trust 메시 연결, ACL 규칙 정의 |
| 2 | **Git 표준 저장소** | `data/`, `wiki/`, `apps/`, `ops/` 표준 디렉토리 + .gitignore + 첫 커밋 |
| 3 | **Obsidian Vault 셋업** | second-brain 스키마(CLAUDE.md) + index.md + 첫 ingest 5건 |
| 4 | **n8n 자체 호스팅** | Docker 1대 설치(고객 서버 또는 UTTEC revita 서버) + 첫 워크플로우 1개 |
| 5 | **Slack 자동 알림 통합** | 일일 요약 봇 + 시스템 이상 알림 + 작업 완료 알림 |
| 6 | **운영 매뉴얼 + 영상 강의** | PDF 50p (셋업·운영·트러블슈팅) + 1시간 영상 강의 |

---

## 4. 견적 내역

| 구분 | 항목 | 금액 |
|------|------|------|
| 기술 | 인프라 셋업 (5영업일) | 350만원 |
| 콘텐츠 | 운영 매뉴얼 + 영상 강의 | 100만원 |
| 교육 | 1시간 사용자 교육 (현장/원격) | 50만원 |
| **소계** | | **500만원** |
| 부가세 (10%) | | 50만원 |
| **합계** | | **550만원** |

---

## 5. 포함 / 미포함

**포함**
- 설치·셋업·검증 전 과정 + 운영 매뉴얼 + 영상 강의 + 1시간 사용자 교육
- 셋업 후 30일 이메일/Slack 무상 지원 (영업일 24h 이내 응답)

**미포함 (옵션)**
- Stage 1 교육 (300만): 13개 AI 도구 가이드 + 5 Track 코스
- Stage 2 위키 + 워크플로우 (2,500만): 도메인 wiki 30~50p + n8n 워크플로우 5종
- Stage 3 운영 앱 (2,500만): demo_live.html 진화형 앱
- 추가 워크플로우 1건당 100만 (Stage 0 종료 후 별도 견적)

---

## 6. 진행 절차

| Day | 작업 |
|-----|------|
| Day 1 | 사전 미팅 (요구사항 확인 + 네트워크 점검 + 첫 워크플로우 도메인 결정) |
| Day 2~3 | 인프라 셋업 (Tailscale + Git + Obsidian + n8n) |
| Day 4 | 첫 워크플로우 구현 + Slack 알림 통합 |
| Day 5 | 검증 + 사용자 교육(1시간) + 운영 매뉴얼 인계 |

---

## 7. 차별화 메시지 (영업 카피)

> **"Foundry급 인프라를 1/100 가격에 구축합니다."**
>
> Palantir Foundry는 1층(Core Services)에 자체 R&D 수십 년이 들어가 있어 라이선스만 연 수억~수십억. 우리는 그 R&D를 이미 완성된 오픈소스(Tailscale·Git·Obsidian·n8n)로 우회하고, 차별화 가치를 2~5층(데이터 통합·온톨로지·분석·운영 앱)에 집중합니다. **Stage 0이 만족스러우시면 Stage 1~3로 단계별 확장, 아니면 1주 후 모든 자료 인계하고 떠납니다.**

---

## 8. 다음 단계

1. 본 견적 검토 후 회신 (이메일·전화·Slack)
2. 사전 미팅 (30분, 온라인 가능) — 요구사항 확인
3. 계약 체결 + Day 1 일정 확정

---

**UTTEC** | 이형근 | ihong9059@gmail.com
임베디드 38년 + AI 통합 1인 사업자 | 한국 KC·일본 TELEC·유럽 CE 인증 보유
