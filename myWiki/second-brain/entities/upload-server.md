---
title: upload-server — 스크린샷 업로드 서버 (vault 공통 도구 후보)
type: entity
created: 2026-06-13
updated: 2026-06-13
tags: [도구, 업로드, 스크린샷, python, stdlib, multi-agent, 공통도구]
links: [n8n-uttec, tailscale네트워크, gaps]
---

# upload-server — 스크린샷 업로드 서버

## 한 줄 정의

**Python stdlib 단일 파일(140줄, 의존성 0) web 업로드 서버.** Lenovo Windows(캡처 발생) → vault `raw/screenshots/` 전달 채널. n8n-claude가 2026-05-27 실증 후 **9 vault 공통 표준 도구로 채택 권고** (카드 2026-05-27-004, 2026-06-13 흡수).

## 해결하는 문제

사용자 PC 캡처 → vault 전달의 표준 채널 부재. scp(명령 마찰)·Taildrop(권한 설정)·sshfs(초기 설정)·git push(과함) 모두 부담 → **브라우저만 있으면 되는 web 업로드**가 최소 마찰 (사용자 본인 제안).

## 사양 (재생성 가능 수준)

```
[브라우저] → POST http://<vault-host>:<port>/ (multipart/form-data, field "f")
→ vault/raw/screenshots/{YYYYMMDD-HHMMSS}-{filename} 저장 → Claude Read
```

- GET / = HTML 폼 (파일 선택 → 미리보기 → Send → 상태박스 "✓ SAVED" 표시)
- bind: Tailscale IP (외부 노출 0)
- 원본 코드: `n8nUttec/scripts/upload_server.py`
- ⚠️ `cgi` 모듈 Python 3.13+ deprecated — `email` 모듈 multipart 직접 파싱으로 마이그레이션 필요

## 실증 (n8nUttec, 2026-05-27)

수신 4장 (61~114KB 손실 0) / 왕복 5~10초 / 적용 사례: n8n UI workflow archived 진단 (캡처 → DB 진단 → 함정 박제)

## 표준화 옵션 (n8n-claude 권고 = B)

| 옵션 | 설명 | 평가 |
|:-:|---|---|
| A | 각 vault에 코드 복사 | 동기화 부담 — 비추 |
| **B** | 단일 코드 + `--port`·`--target` 인자화 | ★★★ 권고 |
| C | 단일 서버 + vault dropdown 라우팅 | Phase 2 후보 |

포트 분배 제안: n8nUttec 8000 / myWiki 8001 / revita 8002 / onDevice 8003 / shield 8004 / wishket 8005 / 기타 8006~.

## 채택 상태 (2026-06-13)

- **entity 박제만 완료** — myWiki 측 코드 보유 0
- 표준화(인자화 리팩토링 주체)·fleet 전파(다른 vault 카드 발송)·Lenovo 측 사본 복사는 **사용자 결단 대기** ([[ai-direction]] 결정 50 보류 박제)

## 관련 페이지

- [[n8n-uttec]] § D — 흡수 원본 카드
- [[tailscale네트워크]] — bind 대상 네트워크
