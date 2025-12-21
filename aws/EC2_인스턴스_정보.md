# AWS EC2 인스턴스 정보

**작성일:** 2025-12-21
**최종수정:** 2025-12-21

---

## 인스턴스 목록

| 별칭 | 인스턴스 이름 | 퍼블릭 IP | OS | 용도 |
|------|--------------|-----------|-----|------|
| **에듀** | hw-c-edu-platform | 13.125.148.58 | Amazon Linux 2023 | 교육 플랫폼 |
| - | uttec-first-ec2 | 3.35.139.224 | Amazon Linux 2023 | 테스트용 |

---

## 접속 정보

### 공통 설정
- **사용자:** `ec2-user`
- **리전:** ap-northeast-2 (서울)

### 키 파일 (PEM) 위치

| 위치 | 경로 | 비고 |
|------|------|------|
| **원본** | `C:\todo\today\uttec-first-ec2.pem` | 작업용 |
| **백업** | `C:\todo\today\aws\uttec-first-ec2_backup.pem` | 백업본 |

> **중요:** 이 키 파일을 잃어버리면 EC2 인스턴스에 접속할 수 없습니다!
> 추가로 안전한 위치(USB, 클라우드 등)에 별도 백업을 권장합니다.

### 접속 명령어

```bash
# 에듀 (hw-c-edu-platform) 접속
ssh -i "C:\todo\today\uttec-first-ec2.pem" ec2-user@13.125.148.58

# uttec-first-ec2 접속
ssh -i "C:\todo\today\uttec-first-ec2.pem" ec2-user@3.35.139.224
```

---

## 에듀 서버 상세 정보

### 프로젝트 구조
```
/home/ec2-user/hw-c-edu-platform/
├── backend/     # Node.js 백엔드 서버
└── frontend/    # 프론트엔드
```

### PM2 서비스 현황 (2025-12-21 기준)
| 서비스명 | 상태 | 메모리 | 비고 |
|----------|------|--------|------|
| hw-c-edu-backend | online | 89MB | Node.js |
| hw-c-edu-frontend | online | 52MB | - |

### 주요 명령어

```bash
# PM2 상태 확인
pm2 list

# 로그 확인
pm2 logs

# 서비스 재시작
pm2 restart all

# 백엔드만 재시작
pm2 restart hw-c-edu-backend

# 프론트엔드만 재시작
pm2 restart hw-c-edu-frontend
```

---

## 주의사항

1. **IP 변경 가능성:** 인스턴스 재시작 시 퍼블릭 IP가 변경될 수 있음
   - Elastic IP 할당 권장
2. **보안 그룹:** SSH(22), HTTP(80), HTTPS(443) 포트 확인
3. **키 파일 보안:** `.pem` 파일은 `.gitignore`에 추가할 것

---

## Claude 작업 시 참고

EC2 작업 시 다음과 같이 명령 실행:
```bash
# 에듀 서버에서 명령 실행
ssh -i "C:\todo\today\uttec-first-ec2.pem" ec2-user@13.125.148.58 "명령어"
```

예시:
```bash
# 에듀 서버 PM2 상태 확인
ssh -i "C:\todo\today\uttec-first-ec2.pem" ec2-user@13.125.148.58 "pm2 list"

# 에듀 서버 로그 확인
ssh -i "C:\todo\today\uttec-first-ec2.pem" ec2-user@13.125.148.58 "pm2 logs --lines 50"
```
