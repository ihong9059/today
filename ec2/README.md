# EC2 서버 관리

이 폴더에는 AWS EC2 서버 접속 및 관리에 필요한 정보가 정리되어 있습니다.

## 파일 목록

| 파일 | 설명 |
|------|------|
| `EC2_접속정보.md` | EC2 인스턴스 정보, SSH 접속 방법, 도메인 정보 |
| `서비스_상세정보.md` | cert-guide, sensor-monitor 서비스 상세 |
| `자주쓰는_명령어.md` | 배포, 로그 확인, 문제 해결 명령어 모음 |
| `uttec-first-ec2.pem` | SSH 접속용 키 파일 (비밀!) |

## 빠른 시작

```bash
# EC2 접속
ssh uttec-ec2

# PM2 상태 확인
ssh uttec-ec2 "pm2 list"

# SensorMonitor 배포
scp SensorMonitor/server/server.js uttec-ec2:~/sensor-monitor/
ssh uttec-ec2 "pm2 restart sensor-monitor"
```

## 서비스 URL

- **자격증 가이드**: http://uttec-cert.duckdns.org
- **센서 모니터**: http://52.78.119.132:5000

---

**주의**: `uttec-first-ec2.pem` 파일은 Git에 커밋하지 마세요!
