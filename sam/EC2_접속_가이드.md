# EC2 접속 가이드

## 서버 정보

| 항목 | 값 |
|------|-----|
| **관리자** | 홍광삼 (samks) |
| **Instance ID** | i-0b0ce9012f3f23d24 |
| **Region** | ap-northeast-2 (서울) |
| **Public IP** | 15.164.220.60 |
| **OS** | Amazon Linux 2023 |
| **OS User** | ec2-user |

---

## 접속 방법

### 방법 1: PEM 키 파일로 SSH 접속

#### Windows (PowerShell)
```powershell
ssh -i "C:\todo\today\sam\samks204.pem" ec2-user@15.164.220.60
```

#### Windows (WSL/Ubuntu)
```bash
ssh -i /mnt/c/todo/today/sam/samks204.pem ec2-user@15.164.220.60
```

#### Linux / Mac
```bash
chmod 400 samks204.pem
ssh -i samks204.pem ec2-user@15.164.220.60
```

> **참고**: Windows에서 권한 오류 발생 시:
> ```powershell
> icacls "C:\todo\today\sam\samks204.pem" /inheritance:r /grant:r "%USERNAME%:R"
> ```

---

### 방법 2: AWS CLI로 접속

#### 사전 요구사항
- AWS CLI 설치
- AWS 자격 증명 설정 (`aws configure`)
- IAM 사용자에 `EC2InstanceConnect` 권한 필요

#### 접속 명령
```bash
aws ec2-instance-connect ssh --instance-id i-0b0ce9012f3f23d24 --region ap-northeast-2
```

---

### 방법 3: 브라우저에서 접속 (EC2 Instance Connect)

아래 URL을 브라우저에서 열어 웹 터미널로 접속:

https://ap-northeast-2.console.aws.amazon.com/ec2-instance-connect/ssh?region=ap-northeast-2&instanceId=i-0b0ce9012f3f23d24

> **참고**: AWS 콘솔 로그인 필요

---

## 웹 서비스

| 서비스 | URL | 포트 |
|--------|-----|------|
| **웹 서버 (Nginx)** | http://15.164.220.60 | 80 |
| **Netdata 모니터링** | http://15.164.220.60:19999 | 19999 |

---

## 열린 포트

| 포트 | 서비스 | 설명 |
|------|--------|------|
| 22 | SSH | 원격 접속 |
| 80 | HTTP | Nginx 웹 서버 |
| 19999 | Netdata | 시스템 모니터링 |

---

## 파일 구조

```
C:\todo\today\sam\
├── samks204.pem          # SSH 접속용 PEM 키 파일
└── EC2_접속_가이드.md     # 이 문서
```

---

## 문제 해결

### SSH 권한 오류 (Windows)
```
WARNING: UNPROTECTED PRIVATE KEY FILE!
```

**해결 방법**:
```powershell
icacls "C:\todo\today\sam\samks204.pem" /inheritance:r /grant:r "사용자이름:R"
```

### AWS CLI 권한 오류
```
AccessDeniedException: ec2-instance-connect:SendSSHPublicKey
```

**해결 방법**: IAM 콘솔에서 사용자에게 `EC2InstanceConnect` 정책 추가

### 접속 타임아웃
- EC2 보안 그룹에서 SSH(22번 포트) 인바운드 규칙 확인
- EC2 인스턴스가 실행 중인지 확인

---

## AWS 콘솔 링크

- **EC2 인스턴스**: https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#InstanceDetails:instanceId=i-0b0ce9012f3f23d24
- **보안 그룹**: sg-0974bdfdc45d411db
- **IAM 사용자 관리**: https://console.aws.amazon.com/iam/home#/users

---

*Last updated: 2026-02-14*
*관리자: 홍광삼 (samks)*
