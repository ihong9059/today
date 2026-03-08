---
name: deploy-web
description: ai-education-web을 Digital Ocean 서버에 배포. "배포해줘", "서버에 업로드", "deploy" 요청 시 사용
---

# AI Education Web 배포 Skill

ai-education-web을 Digital Ocean 서버에 배포하는 skill입니다.

## 서버 정보

- **호스트**: digital (SSH alias)
- **배포 경로**: ~/ai-education-web
- **프로세스 관리**: PM2 (ai-education)
- **URL**: https://uttec-ai.duckdns.org
- **관리자**: https://uttec-ai.duckdns.org/admin

## 배포 절차

### 1. 변경사항 확인
```bash
cd /c/todo/today/ai-education-web && git status
```

변경사항이 없으면 "배포할 변경사항이 없습니다" 안내 후 종료.

### 2. 변경사항이 있으면 커밋
- ai-education-web 관련 파일만 staging
```bash
cd /c/todo/today/ai-education-web && git add src/ package.json package-lock.json .claude/
```

- 커밋 메시지 생성 (변경 내용 요약)
```bash
git commit -m "커밋메시지

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 3. GitHub에 Push
```bash
cd /c/todo/today/ai-education-web && git push
```

### 4. 원격 서버 배포
```bash
ssh digital "cd ~/ai-education-web && git pull && npm install && npm run build && pm2 restart ai-education"
```

**주의**: `npm install`을 포함해야 새 패키지 설치됨

### 5. 배포 확인
```bash
ssh digital "pm2 status ai-education"
```

## 트리거 키워드

- "배포해줘"
- "서버에 업로드"
- "deploy"
- "Digital Ocean에 배포"
- "웹사이트 업데이트"

## 완료 시 표시

배포 완료 후 다음 정보 표시:
- 배포 URL: https://uttec-ai.duckdns.org
- PM2 상태 (online/error)
- 빌드 성공 여부
