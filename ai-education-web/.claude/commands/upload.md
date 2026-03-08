# ai-education-web 배포

로컬 변경사항을 커밋하고 Digital Ocean 서버에 배포합니다.

## 실행 절차

1. **변경사항 확인**
```bash
cd /c/todo/today/ai-education-web && git status
```

변경사항이 없으면 "배포할 변경사항이 없습니다" 안내 후 종료.

2. **변경사항이 있으면 커밋**
- 사용자에게 커밋 메시지 확인 (기본값 제안)
```bash
cd /c/todo/today/ai-education-web && git add -A && git commit -m "커밋메시지"
```

3. **GitHub에 Push**
```bash
cd /c/todo/today/ai-education-web && git push
```

4. **원격 서버 배포**
```bash
ssh digital "cd ~/ai-education-web && git pull && rm -f src/data/curriculum_test.ts && npm run build && pm2 restart ai-education"
```

5. **배포 확인**
```bash
ssh digital "pm2 status ai-education"
```

## 완료 시 표시
- 배포 URL: https://uttec-ai.duckdns.org
- 관리자: https://uttec-ai.duckdns.org/admin
- 현재 버전: Header.tsx의 VERSION 상수 확인
