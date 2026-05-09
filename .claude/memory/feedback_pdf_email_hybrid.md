---
name: PDF 이메일 자동화는 Hybrid (PC 렌더 + n8n 서버 발송)
description: 한글 PDF + 이메일 자동화 시 PC Chrome headless로 렌더 + n8n 서버에서 SMTP 발송하는 hybrid가 검증된 최적 패턴
type: feedback
originSessionId: e9b2ad2a-a869-4c76-85fd-a1b59890fbf0
---
한글 포함 PDF 자동 발송이 필요한 경우 (Stage 0 견적서, 영업 자료, 고객 보고서 등) **PC = 렌더링 / n8n 서버 = 발송**의 hybrid 패턴을 사용한다.

**Why:**
- home-odroidc2 (n8n 서버) 환경에 PDF 도구가 모두 부재 (pip 없음, ensurepip 없음, libpango/libcairo 없음, /usr/share/fonts 폴더 자체 없음, sudo는 비밀번호 필요). 도구 설치에 1시간+ 들어감
- PC는 Chrome 이미 설치 + Windows 한글 폰트(Malgun Gothic) 자동 사용 가능 + Python markdown/paramiko 설치 완료
- 2026-05-05 한국기계·태명과학 Stage 0 견적서 발송 테스트에서 282~283KB PDF 한글 렌더링 깔끔하게 검증됨 (사용자 Gmail 확인 OK)
- 사용자는 "기왕에 만든 n8n임으로 최대한 활용"을 원하므로 SMTP 발송·로그·Notion 통합은 그대로 서버에 둠

**How to apply:**
- 트리거 위치: PC 측 Python 스크립트
- PDF 렌더: Chrome headless `--print-to-pdf` (HTML 중간 산출물 + CSS 인라인)
- 한글 폰트: `font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif`
- 전송: paramiko SFTP `~/n8n/quotes/` + SSH로 서버 스크립트 트리거
- 발송: 서버 `~/n8n/send_quote_attachment.py` (smtplib SMTP_SSL 465 + EmailMessage + add_attachment)
- 자격증명: 서버 `.secrets`만 사용 (PC에는 GMAIL_APP_PASSWORD 저장 안 함)
- 재사용 패턴: `영업/quotes-test/generate_and_send.py`의 COMPANIES dict 구조 + 단일 인자(회사명) 실행
- n8n UI 워크플로우는 시각화·트리거 시 선택적으로 추가 (필수 아님)
- 비고: 서버 ARM64 환경에서 PDF 도구 설치는 sudo 받아 한 번 깔면 가능하나, **렌더링 품질은 여전히 PC가 우수** (Windows 폰트 vs Linux Noto). 정기 자동화로 가도 PC가 트리거하는 hybrid가 합리적.
