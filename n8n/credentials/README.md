# Credentials 폴더

이 폴더는 **git에 커밋되지 않습니다**(.gitignore로 제외).

## 보관 대상
- `.env` — Basic Auth 비밀번호 등 환경변수
- `*.key` / `*.pem` — TLS 인증서
- `secrets.json` — API 토큰 비고

## 보관 금지
- 평문 비밀번호를 워크플로우 export(`.json`)에 포함하지 말 것
- Claude API 키, Notion 토큰, Slack Webhook은 **n8n Credentials UI**에 저장
- 이 폴더는 **로컬 비고**(메모) 용도, 실제 운영 자격증명은 revita 서버에만 존재

## 백업
revita 서버 `~/n8n/data/` 자동 백업에 포함됨 (자세한 건 `../README.md` Step 5).
